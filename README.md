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

首先你需要下载MooJS.js，我建议你选择压缩的版本。

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

Then, load the data into table just do like this:

你可以用下面的方式加载数据：

```javascript
list.table($('tbody'), data, fields);
```

#### Select

If you want to put data into select, you may prepare a dict to tell Moo use which as text and which as value to the option. As you know, options are generally like:

如果你想要把数据放到 select 里面，你应该准备一个小字典去告诉 Moo 数据中的哪个字段是作为 option 的内容哪个字段是作为 value 。如你所知，一般 options 都长得像这样的：

```html
<option value="I'm value">I'm text</option>
```

So, make a dict:

好啦，弄一个字典：

```javascript
var attr = {text: "name", value: "id"};
```

Then, load the data into select just do like this:

然后，你就可以用这方法加载数据到 select 了。

```javascript
list.select($('select'), data, attr);
```

### Paging

First, you may put a ul into html to use as a container of pagination.

你先弄一个 ul 到 html 作为分页的容器。

```html
<ul id="pagination"></ul>
```

Then, use Moo.paging to active this DOM Object.

然后，使用 Moo.paging 来激活这个 DOM Object。

```javascript
Moo.paging(
  $("#pagination"),
  100, // Total page num
  10, // Page per group
  function(data) {...} // Callback
);
```

### Template

Some one say that it's a pack up of str.replace. Never mind, just Okay. If it is in good use. You can replace something easily using template fucntion.

有些人说它是一个 str.replace 的封装而已。没关系，还好啦。只要你觉得好用就行。使用 template 函数可以帮助你轻易替换一些东西。

```javascript
var string = "Hello [name]!";
Moo.Template(
  string,
  {name: "MooJS"}
);
console.log(string);
/* --- Out put ---
Hello MooJS!
*/
```

### cURL

It's not only a pack up of jQuery Ajax, but also useful for submiting, uploading and feching.

这不仅仅只是一个 jQuery 的包装，它更是一个很实用的提交、上传还有数据获取。

```javascript
var getter = Moo.curl();
```

#### Submit

Using for forms submit.

用于表单提交。

```javascript
getter.submit(url, $("form").serialize(), function(data) {
  // Callback
});
```

#### Fetch

Using for data fetch.

用于数据获取。

```javascript
getter.fetch(url, function(data) {
  // Callback
});
```

#### Take

Using for data take with pram.

用于带参数的数据拿取。

```javascript
getter.take(url, {name: "Moo"}, function(data) {
  // Callback
});
```

#### Upload

Using for upload file.

用于上传文件。

```javascript
getter.upload($('input[type=file]'), url, "name", function(data) {
  // Callback
});
```

### Lazy Clock

If you want to wait for something ready, just use lazy.

如果你想要等待什么东西就绪，就用 lazy 吧。

```javascript
$.get(url, function(data) {
  $("body").html('ready');
});
Moo.lazy(function() {
  if ($("body").html() == "ready") {
    // If body's html content is "ready" then exit
    return true;
  } else {
    // Else wait continuelly
    return false;
  };
}, 100, 10);
```

