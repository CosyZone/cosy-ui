---
title: Laravel
---

![](./images/06-Laravel_1.jpeg)

## 什么是 Laravel

Laravel 是一个 PHP 框架。它提供了许多有用的工具，帮助你快速轻松地构建 Web 应用程序。

"Laravel"这个词在英语中并不存在。这个名字是怎么来的呢？据说，Laravel 的创建者 Taylor Otwell 受到了小说《纳尼亚传奇》中的城堡 Cair Paravel 的启发，决定将他的框架命名为 Laravel。

**如果你遇到任何问题，请记得先查阅官方文档寻找答案。**

https://laravel.com/docs/11.x

## 安装

在创建你的第一个 Laravel 项目之前，确保你的本地机器已安装 PHP 和 Composer。

### PHP

检查 PHP 是否已安装

php -v

如果 PHP 未安装，请按照前面的文章安装 PHP。

### Composer

Composer 是 PHP 的包管理器。它帮助你安装和更新项目的依赖。

检查 Composer 是否已安装

这里有点不同，Composer 的 -V 是大写的 V。

composer -V

你将看到：

Composer version 2.7.2 2024-03-11 17:12:18 PHP version 8.3.3 (/opt/homebrew/Cellar/php/8.3.3_1/bin/php)

如果 Composer 未安装，你将看到：

command not found: composer

如果是这种情况，让我们安装它。

打开页面：https://getcomposer.org/download/

运行这些命令：

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" php composer-setup.php php -r "unlink('composer-setup.php');"

然后

sudo mv composer.phar /usr/local/bin/composer

就这样！

### Node.js

一个非常有用的软件，许多项目都需要它，安装它吧！

你可以使用以下命令安装 Node.js：

brew install node

安装完成后，在终端应用中输入此代码并按回车运行。

node -v

如果你看到以下输出，恭喜！你已成功安装 Node.js。

v22.4.1

### Laravel

是时候给我们的项目起个名字了。

这个名字怎么样：luckara？

cd your_workspace_folder && composer create-project laravel/laravel luckara

## 运行

安装完成后，用 VSCode 打开项目。

cd luckara && code .

![](./images/06-Laravel_2.png)

点击"New Terminal"打开终端

![](./images/06-Laravel_3.png)

运行命令"php artisan serve"

![](./images/06-Laravel_4.png)

服务器运行在 [http://127.0.0.1:8000]。

然后打开你的浏览器，你将看到这个漂亮的页面

![](./images/06-Laravel_5.png)

## 上传到 GitHub

安装完成后，用 GitHub Desktop 打开项目：

github .

![](./images/06-Laravel_6.png)

如果你还没有登录，请先登录 GitHub Desktop。

点击"create a repository"

![](./images/06-Laravel_7.png)

![](./images/06-Laravel_8.png)

然后，将它推送到 GitHub

![](./images/06-Laravel_9.png)

![](./images/06-Laravel_10.png)

## 浏览 GitHub 页面

最后，点击"View on GitHub"在浏览器中打开项目查看。

![](./images/06-Laravel_11.png)

## 参考资料

**https://laravel.com**

**https://learnku.com/docs/laravel/10.x**
