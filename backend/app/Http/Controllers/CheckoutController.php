<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use App\Models\Setting;

class CheckoutController extends Controller
{
    public function process(Request $request)
    {
        $this->validate($request, [
            'nama' => 'required|string|max:100',
            'whatsapp' => 'required|string|max:20',
            'email' => 'nullable|email|max:100',
            'items' => 'required|array|min:1',
            'items.*.nama' => 'required|string',
            'items.*.harga' => 'required|integer',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        $nama = $request->input('nama');
        $whatsapp = $request->input('whatsapp');
        $email = $request->input('email');
        $items = $request->input('items');

        // Fetch settings from database (dynamic admin toggle & target number)
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        $checkoutMethod = isset($settings['checkout_method']) ? $settings['checkout_method'] : 'direct';
        $adminWa = isset($settings['admin_whatsapp']) ? $settings['admin_whatsapp'] : '6285727877235';
        $adminEmail = isset($settings['admin_email']) ? $settings['admin_email'] : '';

        // Fetch sensitive tokens from .env (secured on backend server)
        $fonnteToken = env('FONNTE_TOKEN');

        // 1. Calculate Total and Format Order List
        $total = 0;
        $orderListText = "";
        $orderListHtml = "";
        foreach ($items as $index => $item) {
            $subtotal = $item['harga'] * $item['qty'];
            $total += $subtotal;
            
            $num = $index + 1;
            $orderListText .= "{$num}. {$item['nama']} x{$item['qty']} - Rp " . number_format($subtotal, 0, ',', '.') . "\n";
            $orderListHtml .= "<tr>
                <td style='padding: 10px; border-bottom: 1px solid #eee;'>{$item['nama']}</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee; text-align: center;'>{$item['qty']}</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee; text-align: right;'>Rp " . number_format($item['harga'], 0, ',', '.') . "</td>
                <td style='padding: 10px; border-bottom: 1px solid #eee; text-align: right;'>Rp " . number_format($subtotal, 0, ',', '.') . "</td>
            </tr>";
        }

        // 2. Save Order to Database
        $order = \App\Models\Order::create([
            'nama' => $nama,
            'whatsapp' => $whatsapp,
            'email' => $email,
            'items' => $items,
            'total_harga' => $total,
            'checkout_method' => $checkoutMethod,
            'status' => 'pending'
        ]);

        // 3. Format WhatsApp Message
        // 3. Format WhatsApp Message untuk Admin
        $waMessageAdmin = "🛍️ *PESANAN BARU - KOPERASI UTM (Order #{$order->id})*\n\n"
                   . "Detail Pelanggan:\n"
                   . "• Nama: {$nama}\n"
                   . "• No. WA: {$whatsapp}\n"
                   . ($email ? "• Email: {$email}\n\n" : "\n")
                   . "Daftar Belanja:\n"
                   . $orderListText . "\n"
                   . "*Total Pembayaran: Rp " . number_format($total, 0, ',', '.') . "*\n\n"
                   . "Mohon segera diproses.";

        // Format WhatsApp Message untuk Pembeli
        $waMessageBuyer = "Halo *{$nama}*, terima kasih telah berbelanja di *Koperasi UTM*!\n\n"
                   . "Berikut adalah ringkasan pesanan Anda (Order #{$order->id}):\n"
                   . $orderListText . "\n"
                   . "*Total Pembayaran: Rp " . number_format($total, 0, ',', '.') . "*\n\n"
                   . "Pesanan Anda sedang kami verifikasi. Admin kami akan segera menghubungi Anda jika diperlukan.";

        if ($checkoutMethod === 'direct') {
            // Form WhatsApp Direct Redirect Link
            $redirectUrl = "https://wa.me/{$adminWa}?text=" . urlencode($waMessageAdmin);
            return response()->json([
                'success' => true,
                'checkout_method' => 'direct',
                'redirect_url' => $redirectUrl
            ]);
        }

        // 3. Advanced Notification Method (Fonnte & SMTP)
        
        // c. Send WA to Admin and Buyer via Fonnte
        $waStatus = 'not_sent';
        if ($fonnteToken) {
            // Send to Admin
            $adminRes = $this->sendFonnteWhatsApp($fonnteToken, $adminWa, $waMessageAdmin);
            
            // Send to Buyer
            if ($whatsapp) {
                // Free Fonnte tier rate limits parallel/fast requests, adding delay
                sleep(2);
                
                $formattedBuyerNumber = $whatsapp;
                if (str_starts_with($whatsapp, '0')) {
                    $formattedBuyerNumber = '62' . substr($whatsapp, 1);
                }
                $buyerRes = $this->sendFonnteWhatsApp($fonnteToken, $formattedBuyerNumber, $waMessageBuyer);
                $waStatus = "Admin: $adminRes, Buyer: $buyerRes";
            } else {
                $waStatus = "Admin: $adminRes";
            }
        }

        // d. Send Invoice Email via SMTP
        $emailStatus = 'not_sent';
        $smtpHost = env('MAIL_HOST');
        if ($smtpHost && $email) {
            // Generate professional HTML invoice content
            $emailHtml = "
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background: #ffffff;'>
                <div style='text-align: center; border-bottom: 2px solid #0f5132; padding-bottom: 20px; margin-bottom: 20px;'>
                    <h2 style='color: #0f5132; margin: 0;'>KOPERASI UTM</h2>
                    <p style='color: #777; margin: 5px 0 0;'>Koperasi Universitas Trunojoyo Madura</p>
                </div>
                
                <h3 style='color: #333;'>Invoice Pembelian</h3>
                <p style='color: #555;'>Halo <strong>{$nama}</strong>, terima kasih telah berbelanja di Koperasi UTM. Berikut rincian pesanan Anda:</p>
                
                <div style='background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;'>
                    <table style='width: 100%; font-size: 14px;'>
                        <tr><td style='width: 100px; color: #777;'>Nama:</td><td><strong>{$nama}</strong></td></tr>
                        <tr><td style='color: #777;'>WhatsApp:</td><td>{$whatsapp}</td></tr>
                        <tr><td style='color: #777;'>Email:</td><td>{$email}</td></tr>
                    </table>
                </div>

                <table style='width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;'>
                    <thead>
                        <tr style='background: #0f5132; color: #ffffff;'>
                            <th style='padding: 10px; text-align: left;'>Produk</th>
                            <th style='padding: 10px; text-align: center; width: 60px;'>Qty</th>
                            <th style='padding: 10px; text-align: right; width: 100px;'>Harga</th>
                            <th style='padding: 10px; text-align: right; width: 120px;'>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {$orderListHtml}
                    </tbody>
                </table>

                <div style='text-align: right; font-size: 16px; margin-bottom: 30px;'>
                    <strong>Total Pembayaran: <span style='color: #0f5132; font-size: 18px;'>Rp " . number_format($total, 0, ',', '.') . "</span></strong>
                </div>

                <div style='border-top: 1px solid #eee; padding-top: 20px; text-align: center; font-size: 12px; color: #777;'>
                    <p>Pesanan Anda sedang kami verifikasi. Admin kami akan segera menghubungi Anda jika diperlukan.</p>
                    <p>&copy; " . date('Y') . " Koperasi Universitas Trunojoyo Madura. All Rights Reserved.</p>
                </div>
            </div>";

            try {
                // SMTP config is loaded from env dynamically by Laravel already
                
                // 1. Send Email to Buyer
                Mail::html($emailHtml, function ($message) use ($email, $nama) {
                    $message->to($email, $nama)
                            ->subject('Invoice Koperasi UTM - Pembelian Anda');
                });

                // 2. Send Email to Admin (if admin email is configured)
                if ($adminEmail && filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) {
                    $adminSubject = "Notifikasi Pesanan Baru (Order #{$order->id}) dari {$nama}";
                    Mail::html($emailHtml, function ($message) use ($adminEmail, $adminSubject) {
                        $message->to($adminEmail, 'Admin Koperasi UTM')
                                ->subject($adminSubject);
                    });
                }

                $emailStatus = 'sent_to_both';
            } catch (\Exception $e) {
                $emailStatus = 'failed: ' . $e->getMessage();
            }
        }

        return response()->json([
            'success' => true,
            'checkout_method' => 'advanced',
            'wa_status' => $waStatus,
            'email_status' => $emailStatus
        ]);
    }

    private function sendFonnteWhatsApp($token, $target, $message)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => $target,
                'message' => $message,
                'countryCode' => '62',
            ),
            CURLOPT_HTTPHEADER => array(
                'Authorization: ' . $token
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            return 'failed_curl: ' . $err;
        }

        $resDecoded = json_decode($response, true);
        if (isset($resDecoded['status']) && $resDecoded['status'] == true) {
            return 'sent';
        }

        return 'failed_api: ' . ($resDecoded['reason'] ?? $response);
    }
}
