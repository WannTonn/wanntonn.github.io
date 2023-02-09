---
title: '关于浏览器缓存'
date: 2023-02-03T08:30:24+08:00
draft: false
tags:
 - Code
 - Browser
image: '/images/Code/javascript.jpg'
---

在日常工作或面试的时候，都会提到一点：如何合理配置浏览器缓存。

<!--more-->
### 什么是浏览器缓存
用户通过HTTP获取到的所有资源，会保存在浏览器缓存中，在下一次请求时可以避免重复向服务器发起多余请求。

### 浏览器缓存的分类
一般而言浏览器缓存分为两类：
  - 强缓存：
    - Expires Expires: Fri, 3 Mar 2023 09:00:45 GMT （不建议使用，Expire为服务端下发的绝对时间是与客户端上的时间做比较匹配，所以会收客户端上的时间的影响，从而造成误差。）
    - Cache-Control Cache-Control:max-age=3600 （相对时间，max-age以秒为单位，相对服务器下发时间多少秒作为缓存失效的时效）
    - Expires与Cache-Control同时配置的时候。以Cache-Control为准。
  - 协商缓存：
    - Last-Modified If-Modified-Since Last-Modified: Fri, 3 Mar 2023 19:35:45 GMT
    - Etag If-None-Match（Etag为一串hash值，当过了强缓存失效后，客户端发起资源请求给服务端的时候，用这个hash值给服务器匹配，解决本地资源已缓存，但是只是时间过期导致的资源重复请求的问题。）
    - Last-Modified和Etag是可以同时设置的，服务器会优先校验Etag，如果Etag相等就会继续比对Last-Modified，最后才会决定是否返回304
我们需要知道的是，浏览器在加载资源时，会先判断是否命中强缓存，再验证是否命中协商缓存。

