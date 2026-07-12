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
    $router->post('/api/kategori/bulk-delete', 'KategoriController@bulkDestroy');

    // Produk CRUD
    $router->post('/api/produk', 'ProdukController@store');
    $router->post('/api/produk/{id}', 'ProdukController@update'); // POST to support multipart/form-data upload easily
    $router->delete('/api/produk/{id}', 'ProdukController@destroy');
    $router->post('/api/produk/{id}/archive', 'ProdukController@archive');
    
    // Bulk Produk Actions
    $router->post('/api/produk/bulk-delete', 'ProdukController@bulkDestroy');
    $router->post('/api/produk/bulk-archive', 'ProdukController@bulkArchive');

    // Dashboard Stats
    $router->get('/api/stats', 'StatsController@index');
    
    // User Management
    $router->get('/api/users', 'UserController@index');
    $router->post('/api/users', 'UserController@store');
    $router->put('/api/users/{id}', 'UserController@update');
    $router->delete('/api/users/{id}', 'UserController@destroy');
    $router->post('/api/users/bulk-delete', 'UserController@bulkDestroy');
});

