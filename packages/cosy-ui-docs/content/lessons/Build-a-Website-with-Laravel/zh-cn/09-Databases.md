---
title: Databases
---

## Introduction to Databases

A database is an organized collection of data that can be easily accessed, managed, and updated. Databases are essential in modern web applications because they store crucial information such as user details, content, and settings. Databases can be classified into two main types:

1. **Relational Databases (RDBMS)**: These databases store data in tables and use Structured Query Language (SQL) for querying. Examples include MySQL, PostgreSQL, and SQLite.

2. **NoSQL Databases**: These databases do not necessarily follow the table-based structure and can store data in formats like JSON or key-value pairs. Examples include MongoDB and Redis.

## Laravel and Databases

Laravel is a powerful PHP framework designed to simplify web development, and it comes with robust tools for interacting with databases. Laravel abstracts the complexities of database operations and provides developers with an expressive and easy-to-use syntax for interacting with databases. Here's how Laravel handles databases:

### 1. Database Configuration

Laravel uses configuration files to manage database connections. The main configuration file for database settings is config/database.php. This file allows you to configure multiple database connections and set the default connection that your application will use.

Example configuration in database.php:

'connections' =&gt; [ 'mysql' =&gt; [ 'driver' =&gt; 'mysql', 'host' =&gt; env('DB_HOST', '127.0.0.1'), 'port' =&gt; env('DB_PORT', '3306'), 'database' =&gt; env('DB_DATABASE', 'forge'), 'username' =&gt; env('DB_USERNAME', 'forge'), 'password' =&gt; env('DB_PASSWORD', ''), 'charset' =&gt; 'utf8mb4', 'collation' =&gt; 'utf8mb4_unicode_ci', 'prefix' =&gt; '', 'strict' =&gt; true, 'engine' =&gt; null, ], ],In this configuration, Laravel uses environment variables to define the database connection details. This approach enhances security and flexibility, as you can easily change configurations based on your environment (development, production, etc.).

### 2. Migrations

Migrations in Laravel are like version control for your database. They allow you to define the structure of your database in PHP code and make it easy to modify and share the database schema.

Creating a migration:

php artisan make:migration create_users_tableThis command creates a new migration file in the database/migrations directory. The migration file contains methods like up and down, where up defines the changes to apply (e.g., creating tables or adding columns), and down reverts those changes.

Example migration:

public function up() {

    Schema:: create('users', function (Blueprint $table) {

        $table -&gt; id();

        $table -&gt; string('name');

        $table -&gt; string('email') -&gt; unique();

        $table -&gt; timestamps();

    });

}

public function down() {

    Schema:: dropIfExists('users');

}Running migrations:

php artisan migrateThis command applies all pending migrations to the database, creating or modifying tables as specified.

### 3. Eloquent ORM

Eloquent is Laravel's built-in Object-Relational Mapping (ORM) tool that provides a simple and elegant way to interact with the database. With Eloquent, each database table is represented by a corresponding "Model" in your application.

Creating a model:

php artisan make:model UserThis command creates a User model class in the app/Models directory. By default, the model will assume a database table named users. You can then use this model to perform CRUD (Create, Read, Update, Delete) operations on the users table.

Example usage of Eloquent:

// Create a new user

$user = new User;

$user -&gt; name = 'John Doe';

$user -&gt; email = 'john@example.com';

$user -&gt; save();

// Retrieve all users

$users = User:: all();

// Find a user by ID

$user = User:: find(1);

// Update a user

$user -&gt; name = 'Jane Doe';

$user -&gt; save();

// Delete a user

$user -&gt; delete ();### 4. Query Builder

Laravel's Query Builder provides a convenient interface for constructing and running database queries. Unlike Eloquent, which operates on entire models, Query Builder allows you to perform more granular operations.

Example usage:

// Select all users

$users = DB:: table('users') -&gt; get();

// Select a single user

$user = DB:: table('users') -&gt; where('id', 1) -&gt; first();

// Insert a new user

DB:: table('users') -&gt; insert([

    'name' =&gt; 'John Doe',

    'email' =&gt; 'john@example.com',

]);

// Update a user

DB:: table('users')

    -&gt; where('id', 1)

    -&gt; update(['name' =&gt; 'Jane Doe']);

// Delete a user

DB:: table('users') -&gt; where('id', 1) -&gt; delete ();The Query Builder is powerful and allows you to build complex queries with ease, including joins, unions, and subqueries.

### 5. Database Seeding

Database seeding is the process of populating your database with test data. Laravel provides a simple way to seed your database using seed classes. These classes are stored in the database/seeders directory.

Creating a seeder:

php artisan make:seeder UsersTableSeederExample seeder:

public function run() {

    DB:: table('users') -&gt; insert([

        'name' =&gt; 'John Doe',

        'email' =&gt; 'john@example.com',

        'password' =&gt; bcrypt('password'),

    ]);

}Running seeders:

php artisan db: seedThis command executes the run method of your seeders, inserting the specified data into the database.

### 6. Database Transactions

Laravel provides a simple way to manage database transactions. Transactions ensure that a series of database operations are executed successfully as a unit; if any operation fails, the transaction is rolled back.

Example of a transaction:

DB:: transaction(function () {

    $user = User:: create([

        'name' =&gt; 'John Doe',

        'email' =&gt; 'john@example.com',

    ]);

    Profile:: create([

        'user_id' =&gt; $user -&gt; id,

        'bio' =&gt; 'This is John\'s profile',

    ]);

});If any part of the transaction fails, none of the changes will be applied to the database.

## Conclusion

Laravel provides a comprehensive set of tools for working with databases, making it easier to handle everything from simple queries to complex transactions. Whether you're using Eloquent ORM for object-oriented database interaction or Query Builder for more direct queries, Laravel's database features are designed to be intuitive and powerful. By leveraging migrations, seeders, and transactions, you can manage your application's database efficiently and effectively.
