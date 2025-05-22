---
title: OOP
---

Object-Oriented Programming (OOP) is a programming paradigm that uses "objects" to design applications and computer programs. It utilizes several key concepts, making it easier to manage and maintain code, especially in large applications like those built with Laravel. This article will introduce you to the basics of OOP in PHP and how it applies to Laravel.

## Key Concepts of OOP

### Classes and Objects

- **Class**: A class is a blueprint for creating objects. It defines properties (attributes) and methods (functions) that the objects created from the class can use.

- **Object**: An object is an instance of a class. When you create an object, you are creating a specific instance defined by the class.

**Example**:

class Car {
    public $color;
    public $model;
    public function drive() {

        return "Driving a " . $this-&gt;color . " " . $this-&gt;model;

    }
}

$myCar = new Car();

$myCar-&gt;color = "red";

$myCar-&gt;model = "Toyota";

echo $myCar-&gt;drive(); // Output: Driving a red Toyota### Inheritance

Inheritance allows a class to inherit properties and methods from another class. This promotes code reusability.

**Example**:

class Vehicle {
    public $speed;

    public function accelerate() {

        return "Accelerating at ".$this -&gt; speed. " km/h";

    }
}

class Bike extends Vehicle {

    public $type;

    public function bikeInfo() {

        return "This is a ".$this -&gt; type. " bike.";

    }
}

$myBike = new Bike();

$myBike -&gt; speed = 20;

$myBike -&gt; type = "mountain";

echo $myBike -&gt; accelerate(); // Output: Accelerating at 20 km/h

echo $myBike -&gt; bikeInfo(); // Output: This is a mountain bike.### Encapsulation

Encapsulation is the concept of restricting access to certain components of an object. This is typically done using visibility keywords: public, protected, and private.

- **Public**: Accessible from anywhere.

- **Protected**: Accessible within the class and by derived class.

- **Private**: Accessible only within the class itself.

**Example**:

class User {

    private $password;

    public function setPassword($password) {

        $this -&gt; password = $password;

    }

    public function getPassword() {

        return $this -&gt; password;

    }

}

$user = new User();

$user -&gt; setPassword("secret");

echo $user -&gt; getPassword(); // Output: secret### Polymorphism

Polymorphism allows methods to do different things based on the object it is acting upon. This can be achieved through method overriding or interfaces.

**Example**:

class Animal {
    public function sound() 
    {
        return "Some sound";
    }
}

class Dog extends Animal {
    public function sound() 
    {
        return "Bark";
    }

}

class Cat extends Animal {
    public function sound() 
    {
        return "Meow";
    }
}

$animals = [new Dog(), new Cat()];

foreach($animals as $animal)
{
    echo $animal -&gt; sound(); // Output: Bark Meow
}## OOP in Laravel

Laravel is a PHP framework that heavily utilizes OOP principles. Understanding OOP will help you grasp Laravel's architecture, including:

### 1. Models

In Laravel, models represent the data and the business logic of your application. Each model corresponds to a database table and is an instance of a class.

### 2. Controllers

Controllers handle user requests and return responses. They are classes that group related request handling logic.

### 3. Middleware

Middleware provides a convenient mechanism for filtering HTTP requests entering your application. They are also implemented as classes.

### 4. Dependency Injection

Laravel uses dependency injection to manage class dependencies. This promotes loose coupling and makes your code easier to test and maintain.

## Conclusion

Object-Oriented Programming is a powerful paradigm that enhances code organization, reusability, and maintainability. By mastering OOP concepts, you will be better equipped to develop robust applications using PHP and Laravel. As you continue your learning journey, practice these concepts by building small projects and gradually integrating them into larger applications. Happy coding!