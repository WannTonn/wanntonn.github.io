---
title: "Javascript 日志"
date: 2021-03-18T23:35:24+08:00
draft: true
tags: 
 - Code
image: '/images/Code/javascript.jpg'
---
<!--more-->


> js 实现无感下载

```javascript
function download(url, filename) {
    return fetch(url).then(res => res.blob().then(blob => {
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }))
}
```