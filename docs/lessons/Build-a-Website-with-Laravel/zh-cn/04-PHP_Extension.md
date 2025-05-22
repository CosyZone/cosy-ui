---
title: PHP Extension
---

## 什么是 PHP 扩展

PHP 扩展是用于增强 PHP 功能的附加模块或库。这些扩展提供了新的函数、类和特性，使开发者能够在 PHP 中使用更广泛的功能。

## 列出扩展

php -m## 使用 PECL 安装扩展

**PECL (PHP Extension Community Library)** 是一个为 PHP 提供众多可选扩展的扩展库。

你可以通过运行以下命令来检查是否已安装：

pecl version

Redis 是一个常用的软件，有时你可能希望它能与 PHP 配合使用，这时你需要为 PHP 安装 Redis 扩展。

pecl install redis

在安装过程中，系统可能会提示你提供额外信息，比如 PHP 配置文件的路径。如果出现这种情况，只需按照提示操作即可。

安装完成后，你会看到类似这样的内容：

![](./images/04-PHP_Extension_1.png)

## 总结

PHP 扩展是增强 PHP 功能的重要工具。开发者可以根据具体的应用需求，选择并安装合适的扩展。
