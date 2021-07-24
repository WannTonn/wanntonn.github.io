# JavaScript 经验之js实现无感下载
<!--
 * @Author: WannTonn
 * @Date: 2021-06-19 21:18:53
 * @Description: 
 * @FilePath: /wanntonn.github.io/_posts/2021-03-15-JavaScript.md
-->

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