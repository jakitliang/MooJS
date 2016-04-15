#MooJS - A Tiny Javascript Toolkit

Are you frastrated about writing a lot of data loading codes?

Are you crazy about doing things at topspeed and release yourself from computer?

Now I'll tell you MooJS can help you with these.

你是否觉得写一大堆加载逻辑代码很烦？

你是否热衷于赶紧把事情完成然后将自己从电脑解脱出来。

好的，我现在告诉你，MooJS可以帮助你！

##Introduction

MooJS is a tiny Javascript library with some easy use functions. It is born for front-end workers. You can enjoy Fast Writing Front-end with the features in this library.

MooJS 是一套精简的、具备基本便利功能的 Javascript 函数库，为前端工作者快速开发而生。使用此函数库，你可以体会到什么叫前端速写。

##Quick Guide 

In order to save your time, there is a quick guide help you use MooJS.

为了节省您的宝贵时间，这里给你提供 MooJS 的速成指南。

1. Get Involved
2. Data Listing
   1. Table
   2. Select
3. Data Paging
4. Template
5. cURL
6. Lazy Clock

###Get Involved

Firstly, you may download MooJS.js, I suggest you to select the Min version.

首先你需要下载MooJS.js，我建议你选择压缩版本。

And then, put it in your HTML code. just like this.

然后像下面那样把它放到HTML里面。

```html
<script src="[path]/MooJS.js"></script>
```

Now, you can see a Moo in your console!

好啦，你现在可以看到一只Moo出现在你的控制台！

```javascript
console.log(Moo);
```

###Data Listing

Firstly, prepare your data in JSON type which you can loading from Ajax. And, you should new a listing object for next steps.

首先，请准备 JSON 数据或者你直接从 Ajax 获取好了。还有，你需要 new 一个用于展示数据的listing对象以便于之后的步骤。

```javascript
var data_str = '[{"id": 1, "name": "Ammily"}, {"id": 2, "name": "Baby"}]';
var data = JSON.parse(data_str);
var list = Moo.listing();
```

####Table

For tables, you should prepare fields for table columns.

对于表格来说，你需要为表格的列准备字段：

```
var fields = Array("id", "name");
```

 can load data in table like this:

你可以用下面的方式加载数据：

```javascript
list.table($('tbody'), data, attr);
```

