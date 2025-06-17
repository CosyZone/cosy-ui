---
title: Laravel Log
---

In the Laravel framework, the use of logs is a very important feature. It helps us track the running status of the application, debug errors, and collect key information.

## 1. Configuring Logs

The log configuration of Laravel is usually located in the&nbsp;config/logging.php&nbsp;file. Here, you can define different log channels (channels), such as&nbsp;stack,&nbsp;single,&nbsp;daily, etc. Each channel has its specific settings, such as storage path, log level, etc.

For example, if you want to store logs as a new file every day, you can configure the&nbsp;daily&nbsp;channel as follows:

'daily' =&gt; [ 'driver' =&gt; 'daily', 'path' =&gt; storage_path('logs/laravel.log'), 'level' =&gt; 'debug', 'days' =&gt; 14, ],## 2. Recording Logs

In the code, you can use the&nbsp;Log&nbsp;facade to record logs. Laravel provides different log levels, including&nbsp;debug,&nbsp;info,&nbsp;notice,&nbsp;warning,&nbsp;error,&nbsp;critical, and&nbsp;alert.

use Illuminate\Support\Facades\Log;

Log::debug('This is a debug message'); Log::info('This is a general information'); Log::warning('This is a warning message'); Log::error('This is an error message');## 3. Log Context

To provide more useful information, you can also add context data when recording logs. For example:

Log::info('User login', ['user_id' =&gt; 123, 'username' =&gt; 'john_doe']);## 4. Using Logs in Controllers

In controller methods, recording logs can help you understand the processing of requests and possible problems.

public function store(Request $request) { try { // Processing request logic Log::info('User submitted data'); } catch (\Exception $e) { Log::error('An error occurred while processing the request', ['exception' =&gt; $e]); } }## 5. Using Logs in Models

In the methods of the model, recording logs can track the operations of the data and possible abnormal situations.

class User extends Model { public function saveUserInfo($data) { try { // Saving data logic Log::info('Saving user information'); } catch (\Exception $e) { Log::error('An error occurred while saving user information', ['data' =&gt; $data, 'exception' =&gt; $e]); } } }By properly configuring and using Laravel Log, we can better understand the running status of the application, discover and solve problems in time, thereby improving development efficiency and application stability.
