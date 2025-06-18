---
title: Laravel Livewire
---

![](./images/20-Laravel_Livewire_1.jpeg)

What is Laravel Livewire?Laravel Livewire is a powerful front-end framework that simplifies the process of building dynamic user interfaces. It allows developers to leverage Laravel's backend capabilities to create modern, responsive applications without writing a lot of JavaScript code.

## Installing Livewire

To use Livewire in your Laravel project, you first need to install it via Composer:

composer require livewire/livewireOnce installed, you can publish Livewire's resources with the following command:

php artisan livewire:publish## Creating a Component

The core of Livewire is its components. You can create a new Livewire component using the following command:

php artisan make:livewire MyComponentThis will create two files: a Blade view file (`resources/views/livewire/my-component.blade.php`) and a PHP component class (`app/Http/Livewire/MyComponent.php`).

## Example of a Component Class

In MyComponent.php, you can define the component's properties and methods:

namespace App\Http\Livewire;

use Livewire\Component;

class MyComponent extends Component {

    public $message = 'Hello, Livewire!';

    public function render() {

        return view('livewire.my-component');

    }

    public function updateMessage() {

        $this -&gt; message = 'Message updated!';

    }

}## Example of a Blade View

In my-component.blade.php, you can use Livewire's directives to bind data and events:

## Using the Component in the Main View

To use the Livewire component in your main view, simply use the @livewire directive or the &lt;livewire:my-component /&gt; tag:

@extends('layouts.app')

@section('content')

&lt;livewire:my-component /&gt;

@endsection## Running the Application

Make sure your Laravel application is running, then navigate to the appropriate page. You will see the Livewire component in action. Clicking the button will update the message without refreshing the page.

## Conclusion

Laravel Livewire is an intuitive and powerful tool for Laravel developers looking to reduce JavaScript code. By using Livewire, you can easily build dynamic user interfaces while keeping your code clean and maintainable.
