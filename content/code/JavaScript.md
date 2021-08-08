---
title: "js 实现无感下载"
date: 2021-03-15T23:35:24+08:00
draft: false
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