<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Public API routes
$router->get('/api/kategori', 'KategoriController@index');
$router->get('/api/produk', 'ProdukController@index');
$router->post('/api/login', 'AuthController@login');

// Admin protected API routes
$router->group(['middleware' => 'auth'], function () use ($router) {
    // Kategori CRUD
    $router->post('/api/kategori', 'KategoriController@store');
    $router->put('/api/kategori/{id}', 'KategoriController@update');
    $router->delete('/api/kategori/{id}', 'KategoriController@destroy');

    // Produk CRUD
    $router->post('/api/produk', 'ProdukController@store');
    $router->post('/api/produk/{id}', 'ProdukController@update'); // POST to support multipart/form-data upload easily
    $router->delete('/api/produk/{id}', 'ProdukController@destroy');
    $router->post('/api/produk/{id}/archive', 'ProdukController@archive');

    // Dashboard Stats
    $router->get('/api/stats', 'StatsController@index');
});

