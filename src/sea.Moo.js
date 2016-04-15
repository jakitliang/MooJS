/**
 * MooLib
 *
 * 会哞哞叫的Javascript工具类
 * A Javascript library with a moo moo here and there.
 *
 * - 这是Seajs插件版本的MooJS
 * - This is the version of MooJS running with seajs.
 *
 * @author Jakit
 * @copyright Jakit
 * @date 2016/3/31
 */
 
define(function (require, exports) {
	var Moo = function () {

		this.site_url = function () {
			return window.location.protocol + "//" + window.location.host;
		};

		/**
		 * 数据罗列显示
		 *
		 * var list = new Moo.
		 */
		this.listing = function () {

			/**
			 * 数据生成选项列表
			 *
			 * @param jQueryObject select  选项列表对象
			 * @param Array data           数据列表
			 * @param Object attr          属性
			 * list.select(
			 *     $("select"),
			 *     Array(...),
			 *     {text: "fieldA", value: "fieldB"}
			 * );
			 */
			this.select = function (select, data, attr) {
				select.html('');
				var row;
				for (i in data) {
					row = '<option value="' + data[i][attr.value] +'">' + data[i][attr.text] + '</option>';
					select.append(row);
				}
			};

			/**
			 * 数据生成表格
			 *
			 * @param jQueryObject tbody  表格对象
			 * @param Array data          数据列表
			 * @param Array fields        要显示的字段
			 * list.table(
			 *     $("tbody"),
			 *     Array(...),
			 *     Array("fieldA", "fieldB", ...)
			 * );
			 */
			this.table = function (tbody, data, fields) {
				tbody.html('');
				var row;
				for (i in data) {
					row = '<tr>';
					for (j in fields) {
						row += '<td>' + data[i][fields[j]] + '</td>';
					}
					row += '</tr>';
					tbody.append(row);
				}
			};
		};

		/**
		 * 分页
		 *
		 * @param jQueryObject pagination  分页控件
		 * @param number total             总页数
		 * @param number pages             每组页数
		 * @param function callback        回调函数
		 * Moo.paging(
		 *     $("pagination"),
		 *     100,
		 *     10,
		 *     function(data) {...}
		 * );
		 */
		this.paging = function (pagination, total, pages, callback) {
			// 处理参数，默认分页为每组10页
			if (typeof(pages) === "undefined") {
				pages = 10;
			} else if (typeof(pages) === "function") {
				callback = pages;
				pages = 10;
			};

			var page_groups = Math.ceil(total / pages);
			var current_group = 1;

			var change_status = function () {
				pagination.html('');
				var last = current_group * pages;
				var first = last - pages + 1;
				if (last > total) {last = total};

				// 添加分页项
				for (var i = first; i <= last; i++) {
					pagination.append('<li><a href="javascript:;" aria-label="Page" page-data="'+i+'">'+i+'</a></li>');
				}
				if (typeof(callback) === "function") {
					pagination.find("a[aria-label='Page']").each(function (index) {
						$(this).click(function () {
							callback($(this).attr("page-data"));
						});
					});
				};

				// 添加前后跳转项
				pagination.prepend('<li><a href="javascript:;" aria-label="Previous">&laquo;</a></li>');
				pagination.append('<li><a href="javascript:;" aria-label="Next">&raquo;</a></li>');
				if (current_group > 1) {
					pagination.find("a[aria-label='Previous']").click(function () {
						current_group--;
						change_status();
					});
				} else {
					pagination.find("a[aria-label='Previous']").parent().addClass("disabled");
				};
				if (current_group < page_groups) {
					pagination.find("a[aria-label='Next']").click(function () {
						current_group++;
						change_status();
					});
				} else {
					pagination.find("a[aria-label='Next']").parent().addClass("disabled");
				};
			}

			// 初始化分页
			change_status();
		};

		/**
		 * 模板生成
		 *
		 * @param string data         数据字符串
		 * @param object replacement  替换字典对象
		 * Moo.template(
		 *     "String",
		 *     {key: "value"}
		 * );
		 */
		this.template = function (data, replacement) {
			var reg = RegExp(/\[\w+\]/g);
			var reg_word = RegExp(/\w+/);

			return data.replace(reg, function (word) {
				return replacement[word.match(reg_word)];
			});
		};

		/**
		 * Ajax数据处理
		 *
		 * var curl = new Moo.curl(...)
		 * @return Object
		 */
		this.curl = function () {

			/**
			 * 提交数据
			 *
			 * @param string url         接口地址
			 * @param string form_data   表单数据
			 * @param function callback  回调函数
			 */
			this.submit = function (url, form_data, callback) {
				$.post(url, form_data, callback);
			};

			/**
			 * 获取数据
			 *
			 * @param string url         接口地址
			 * @param function callback  回调函数
			 */
			this.fetch = function (url, callback) {
				$.get(url, callback);
			};

			/**
			 * 带参数获取数据
			 *
			 * @param string url         接口地址
			 * @param object param       参数
			 * @param function callback  回调函数
			 */
			this.take = function (url, param, callback) {
				$.get(url, param, callback);
			};

			/**
			 * 上传文件
			 *
			 * @param DOMObject file     DOM元素
			 * @param string url         接口地址
			 * @param function callback  回调函数
			 */
			this.upload = function (file, url, type, name, callback) {
				var fd = new FormData();
				fd.append(name, file);

				var xhr = new XMLHttpRequest();
				xhr.open("POST", url, true);
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						callback(xhr.responseText);
						// console.log(xhr.responseText);
					} else if (xhr.readyState == 4 && xhr.status != 200) {
						// 记录错误信息
						console.log({state: xhr.readyState, status: xhr.status, text: xhr.responseText});
					}
				};
				xhr.send(fd);
			};
		};

		/**
		 * 懒惰时钟
		 *
		 * @param function callback
		 * @param number time
		 * @param number times
		 * Moo.lazy(function() {
		 *     return true;
		 * }, 1000, 1);
		 */
		this.lazy = function (callback, time, times, t) {
			times = typeof(times) === "undefined" ? 1 : times;
			if (!t) {
				t = this;
			} else {
				var result = callback();
				if (result || !times) {
					return;
				};
				times--;
			};
			var lz = t.lazy;
			if (times > 0) {
				setTimeout(function () {
					lz(callback, time, times, t);
				}, time);
			};
		};
	};

	exports.Moo = new Moo;
});