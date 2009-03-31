// ==UserScript==
// @name          Javascript debugger
// @namespace     http://tiger2wander.blogspot.com
// @author        Uoc Nguyen
// @email         tiger2wander@gmail.com
// @copyright     2008
// @description   A javascript debugger
// @include       http://127.0.0.1*
// @include       http://localhost*
// @include       file:///*
// @exclude       http://*google.*
// ==/UserScript== 

var  JSDebugger = function () {
	JSDebugger = {
		// Object id
		id : '7ig3r2w4nd3r',

		// Browser id
		isIE : false,
		isIE6 : false,
		isIE7 : false,
		isMF : false,
		isSafari : false,
		isOpera : false,

		// Contants defined here
    startupTips : {INTEL : 'JSDebugger konsole is activated! press &lt;Alt&gt; + &lt;.&gt; for toggle show/hide the konsole.',
                   APPLE : 'JSDebugger konsole is activated! press %lt;Apple logo&gt; + &lt;.&gt; for toggle show/hide the konsole.'},
    STARTUP_TIPS_TIMEOUT : 2000,

    // HTML ENTITIES
    HTML_ENTITIES : [
      [/</g, '&lt;'],
      [/>/g, '&gt;']
    ],
		
		// ====== CSS class define:
		CSS_CLASS : {
			CONSOLE_CLASS : 'K0n5013',
			TITLE_CLASS : 'K0n50137i7i13',
			CLEAR_CONSOLE_CLASS : 'K0n50136134r',
			LINE_COUNT_CLASS : 'K0n50131in360un7',
			CONTENT_CLASS : 'K0n501360n73n7',
			LOG_ROW : 'K0n5013109r0w',
			LOG_TYPE : 'K0n50131097yp3',
			INFO_LOG_TYPE : 'K0n5013109inf07yp3',
			WARN_LOG_TYPE : 'K0n5013109w4rn7yp3',
			ERROR_LOG_TYPE : 'K0n50131093rr0r7yp3',
			INFO_LOG_ROW : 'K0n5013inf0109R0w',
			WARN_LOG_ROW : 'K0n5013w4rn109R0w',
			ERROR_LOG_ROW : 'K0n50133rr0r109R0w',
			STATUS_CLASS : 'K0n50135747u5b4r',
			RESIZE_CLASS : 'K0n5013r35i23i60n',
			COMMAND_LINE_CLASS : 'K0n501360mm4nd1in3',
			AUTO_COMPLETE_CLASS : 'K0n50134u7060mp137',
			COMMAND_ITEM_CLASS : 'K0n501360mm4ndI73m',
			SELECTED_COMMAND_ITEM_CLASS : 'K0n50136313673d60mm4ndI73m',
      STARTUP_TIPS_CLASS : 'K0n5013574r7up7ip5'
		},

		// CSS defined here
		CONSOLE_CSS : '\
			/* ======= Console ================== */\n\
			.K0n5013{\n\
				font-family: Courier;\n\
				position: absolute;\n\
				background-color: #000;\n\
				color: #0f0;\n\
				display: none;\n\
			}\n\
			\n\
			/* ======= Title ==================== */\n\
			.K0n50137i7i13 {\n\
				background-color: #cbcbcb;\n\
				color: #f70;\n\
				cursor: pointer;\n\
				overflow: hidden;\n\
			}\n\
			\n\
			/* ======= Console\'s actions ======== */\n\
			/* ======= Clear Console ============ */\n\
			.K0n50136134r{\n\
			}\n\
			\n\
			/* ======= Log line count =========== */\n\
			.K0n50131in360un7 {\n\
			}\n\
			\n\
			/* ======= Log content container ==== */\n\
			.K0n501360n73n7 {\n\
				overflow: auto;\n\
				width: 100%; height: 100%;\n\
				cursor: crosshair;\n\
			}\n\
			\n\
			/* ======= Log row ================== */\n\
			.K0n501360n73n7 .K0n5013109r0w {\n\
				padding: 2px;\n\
				margin: 2px;\n\
				background-color: #010101;\n\
			}\n\
			\n\
			.K0n501360n73n7 .K0n50131097yp3 {\n\
				font-weight: bold;\n\
			}\n\
			\n\
			.K0n501360n73n7 .K0n5013109inf07yp3 {\n\
				font-weight: bold;\n\
				color: #ff0;\n\
			}\n\
			\n\
			.K0n501360n73n7 .K0n5013109w4rn7yp3 {\n\
				font-weight: bold;\n\
				color: #a00;\n\
			}\n\
			\n\
			.K0n501360n73n7 .K0n50131093rr0r7yp3 {\n\
				font-weight: bold;\n\
				color: #f00;\n\
			}\n\
			\n\
			/* ======= Info row ================= */\n\
			.K0n501360n73n7 .K0n5013inf0109R0w {\n\
				color: #0f0;\n\
			}\n\
			\n\
			/* ======= Warn row ================= */\n\
			.K0n501360n73n7 .K0n5013w4rn109R0w {\n\
				color: #f55;\n\
			}\n\
			\n\
			/* ======= Error row ================ */\n\
			.K0n501360n73n7 .K0n50133rr0r109R0w {\n\
				color: #f00;\n\
			}\n\
			\n\
			/* ======= Commandline ============== */\n\
			.K0n501360mm4nd1in3 {\n\
				display: block;\n\
				border: solid 1px #0f0;\n\
				background-color: #000;\n\
				color: #0f0;\n\
				width: 100%;\n\
			}\n\
			\n\
			/* ======= Autocomplete popup ======-= */\n\
			.K0n50134u7060mp137 {\n\
				background-color: #010101;\n\
				position: absolute;\n\
				overflow: auto;\n\
				width: auto; height: 100px;\n\
				padding: 2px;\n\
				top: -1000px; left: -1000px;\n\
			}\n\
			\n\
			.K0n501360mm4ndI73m {\n\
				color: #f70;\n\
			}\n\
			\n\
			.K0n50136313673d60mm4ndI73m {\n\
				color: #0f0;\n\
				font-weight: bold;\n\
			}\n\
			\n\
			/* ======= Status bar =============== */\n\
			.K0n50135747u5b4r {\n\
				clear: both;\n\
				width: 100%; height: 13px;\n\
				background-color: #cbcbcb;\n\
				color: #000;\n\
			}\n\
			\n\
			/* ======= Resize icon ============== */\n\
			.K0n5013r35i23i60n {\n\
				width: 13px;  height: 13px;\n\
				background: url(data:image/gif;base64,\
													R0lGODlhDAAMAKU9AG1rbGxsbG1tbW5ubG5ubm1vbHBub29vb25wbXFvd\
													HBxaXJwdaOjo6enp6aopamnqKqorampqauprqqqqqyqq6urqaysqqysrK\
													uup8XDyMbEycXFxcfEy8fFysbGxsjGx8fHxcfHx8nHzMjIxsjIyMfJxsr\
													IycrIzcnJx8nJycjKx8vJysrKyMrKysnLyMzKz8vLycrMyc3L0MzMzMzO\
													w83Ny83Nzc/Nzs7Ozs7QzdHP0NTPy9PT0////////////yH+EUNyZWF0Z\
													WQgd2l0aCBHSU1QACwAAAAADAAMAAAGckCScEhydUArD3HoysBWkaVQJR\
													pRDqRWSBhKxTQWwGy2yaa6JclAl9p4cJtUiuRY1EwXkm2z0U4QLywPAS1\
													8MykNATknFQY4ci0pDAQ4LhADN2dnDQQ8IQ4JNR8XZxMBOCETBTIoFAIk\
													EwKHsTscGAo0QQA7);\n\
				float: right;\n\
				cursor: se-resize;\n\
			}\n\
      \n\
      .K0n5013574r7up7ip5 {\n\
        background-color: #ff0a00;\n\
        color: #000;\n\
        position: absolute;\n\
        top: 0px;  left: 0px;\n\
        width: 100%;  height: 25px;\n\
        padding: 2px 2px 0px 5px;\n\
      }\n\
			',
		
		LOG_TEMPLATE : '<fieldset><legend>{<span class="K0n50131097yp3 $LogTypeClass">$LogTypeName</span> - $LogXTime</legend><pre class="K0n5013109r0w $LogRowType">$LogContent</pre></fieldset>',

		// ====== Default size
		CONSOLE_OPTION : {width:690, height: 450, top: 50, left: 50},

		// ====== Key code contants
		KEY_CODE : {
			ENTER_VK_CODE : 13,
			ESCAPE_VK_CODE : 27,
			TAB_VK_CODE : 9,
			LEFT_VK_CODE : 37,
			UP_VK_CODE : 38,
			RIGHT_VK_CODE : 39,
			DOWN_VK_CODE : 40,
			BACKSPACE_VK_CODE : 8,
			DELETE_VK_CODE : 46,
			HOME_VK_CODE : 36,
			END_VK_CODE : 35,
			PAGEUP_VK_CODE : 33,
			PAGEDOWN_VK_CODE : 34,
			INSERT_VK_CODE : 45,
			DOT_VK_CODE : 190
		},

		// Builtin object
		BUILTINT_OBJECT : {
			WINDOW_OBJECT : 'window',
			DOCUMENT_OBJECT : 'document',
			PARENT_OBJECT : 'parent',
			JSDEBUGGER : 'this'
		},

		consoleNode : false,
		titleNode : false,
		contentNode : false,
		logRows : [],
		logEntriesCount : 0,
		selectedCommandIndex : -1,
		suggestCommandList : [],
		activeContext : false,

		// History
		historyCmd : [],
		currentCmdNo : 0,

		// Backup
		consoleOptionBk : {width : 0, height: 0},
		isShaded : false,

		// Trap
		trap : [],

		// Debug
		flag : {debug : false},

		init : function() {
			if (window.addEventListener) {
				window.addEventListener('error', this.errorListener, false);
			} else {
				window.attachEvent('onerror', this.errorListener, false);
			}

			this.detectBrowser();
      this.detectOS();

			this.addStylesheet(this.CONSOLE_CSS);
			var _tmpConsoleNode = document.getElementById(this.id);
			// Detect console is exist
			if (!_tmpConsoleNode) {
				this.createConsole();
			} else {
				this.consoleNode = _tmpConsoleNode;
			}
			var nodeList = this.consoleNode.getElementsByTagName('*');
			for (var i=0; i<nodeList.length; i++) {
				if (nodeList[i].className &&
						nodeList[i].className.indexOf(this.CSS_CLASS['TITLE_CLASS']) != -1) {
					this.titleNode = nodeList[i];
				}
				if (nodeList[i].className &&
						nodeList[i].className.indexOf(this.CSS_CLASS['CONTENT_CLASS']) != -1) {
					this.contentNode = nodeList[i];
				}
				if (nodeList[i].className &&
						nodeList[i].className.indexOf(this.CSS_CLASS['STATUS_CLASS']) != -1) {
					this.statusNode = nodeList[i];
				}
				if (nodeList[i].className &&
						nodeList[i].className.indexOf(this.CSS_CLASS['RESIZE_CLASS']) != -1) {
					this.resizeNode = nodeList[i];
					if (this.isIE6) {
						this.resizeNode.src = '';
						this.resizeNode.style.borderRight = 'solid 1px #f00';
						this.resizeNode.style.borderBottom = this.resizeNode.style.borderRight;
					}
					if (window.addEventListener) {
						this.resizeNode.addEventListener('mousedown', this.initResize, false);
					} else {
						this.resizeNode.attachEvent('onmousedown', this.initResize, false);
					}
				}
				if (nodeList[i].className &&
						nodeList[i].className.indexOf(this.CSS_CLASS['CLEAR_CONSOLE_CLASS']) != -1) {
					this.clearNode = nodeList[i];
				}
				if (nodeList[i].className &&
						nodeList[i].className.indexOf(this.CSS_CLASS['LINE_COUNT_CLASS']) != -1) {
					this.logEntriesCountNode = nodeList[i];
				}
				if (nodeList[i].className &&
						nodeList[i].className.indexOf(this.CSS_CLASS['COMMAND_LINE_CLASS']) != -1) {
					this.commandLineNode = nodeList[i];
				}
				if (nodeList[i].className &&
						nodeList[i].className.indexOf(this.CSS_CLASS['AUTO_COMPLETE_CLASS']) != -1) {
					this.suggestionPopupNode = nodeList[i];
				}
			}

      this.startupTipsNode = document.getElementById(this.CSS_CLASS['STARTUP_TIPS_CLASS']);

			this.clearNode.style.color = '#000';
			if (window.addEventListener) {
				this.clearNode.addEventListener('click', this.clear, false);
			} else {
				this.clearNode.attachEvent('onclick', this.clear, false);
			}

			this.logEntriesCountNode.style.color = '#00f';

			this.updateLineCount();

			this.createLogRowTemplate();

			this.cmdNode = document.createElement('div');
			this.cmdNode.className = this.CSS_CLASS['COMMAND_ITEM_CLASS'];

			this.updateContentSize();

			this.setVisible(false);

			if (window.addEventListener) {
			  document.addEventListener('keydown', this.globalShortcutProcessWrapper, true);
			} else {
			  document.attachEvent('onkeydown', this.globalShortcutProcessWrapper, true);
			}
      JSDebugger.showStartupTips();
		},

		superInit : function() {
			if (!window.JSDebugger) {
				eval('window.JSDebugger = ' + document.body.getAttribute('__JSDebuggerSrc__'));
				JSDebugger.init();
			}
			document.body.removeAttribute('__JSDebuggerSrc__');
			if (window.removeEventListener) {
				document.body.removeEventListener('mousemove', JSDebugger.superInit, false);
			} else {
				document.body.detachEvent('onmousemove', JSDebugger.superInit, false);
			}
		},

		/**
		 * Builtin functions
		 *
		 */
		help : function() {
		},

		about : function() {
			return '<b>Javascript debugger console v0.1</b>\
								\n<b>Author: </b>tiger2wander\
								\n<b>Email: </b>tiger2wander@gmail.com\
								\n<b>Useful tips:</b>\
								\n<b>Builtin functions:</b>\
								\n<b>help(): </b>Show the help of this console.\
								\n<b>about(): </b>Show this message.\
								\n<b>features(): </b>Show the currently supported features.\
								\n<b>changesLog(): </b>Show the changes log.\
								\n<b>TODO(): </b>Show the TODO list.';
		},

		features : function() {
		},

		changesLog : function() {
		},
    // ==== End of builtin ====

    showStartupTips : function() {
      this.setTipsVisible(true);
      window.setTimeout(this.setTipsVisible, this.STARTUP_TIPS_TIMEOUT, false);
    },

    setTipsVisible : function(visible) {
      if (visible && JSDebugger.startupTipsNode.style.display == 'none') {
        JSDebugger.startupTipsNode.style.top = document.body.scrollTop + 'px';
        JSDebugger.startupTipsNode.style.display = 'block';
        return true;
      }
      if (!visible && JSDebugger.startupTipsNode.style.display == 'block') {
        JSDebugger.startupTipsNode.style.display = 'none';
        return true;
      }
      return false;
    },

		detectBrowser : function() {
			var _userAgent = window.navigator.userAgent;
			if (_userAgent.match(/MSIE/)) {
				this.isIE = true;
				if (_userAgent.match(/MSIE 6/)) {
					this.isIE6 = true;
				}
				if (_userAgent.match(/MSIE 7/)) {
					this.isIE7 = true;
				}
			}
			if (_userAgent.match(/Firefox/)) {
				this.isMF = true;
			}
			if (_userAgent.match(/Opera/)) {
				this.isOpera = true;
			}
			if (_userAgent.match(/Safari/)) {
				this.isSafari = true;
			}
		},

    detectOS : function() {
      this.isAppleOS = false;
      var _userAgent = window.navigator.userAgent.toLowerCase();
      if (_userAgent.indexOf('mac') != -1) {
        this.isAppleOS = true;
      }
    },

		addStylesheet : function(cssStr) {
			var headNode = document.getElementsByTagName('head');
			if (headNode && headNode[0]) {
				headNode = headNode[0];
			} else {
				headNode = document.createElement('head');
				document.insertBefore(headNode, document.body);
			}
			if (this.isMF || this.isSafari || this.isIE7) {
				if (!cssStr.match(/^data:text\/css,/)) {
					cssStr = 'data:text/css,' + cssStr;
				}
				var _tmpLinkNode = document.createElement('link');
				_tmpLinkNode.setAttribute('rel', "stylesheet");
				_tmpLinkNode.setAttribute('type', "text/css");
				_tmpLinkNode.setAttribute('href', cssStr);
				headNode.appendChild(_tmpLinkNode);
			}
			if (this.isIE6) {
				var styleSheetRules = cssStr.match(/[^\s]+\s*\{[^}]*\}/gi);
				if (styleSheetRules && styleSheetRules.length > 0) {
					for (var i=0; i<styleSheetRules.length; i++) {
						var _ruleName = styleSheetRules[i].match(/^[^{}]+/i)[0];
						var _ruleContent = styleSheetRules[i].match(/\{([^{}]+)\}/)[1];
						if (_ruleName && _ruleContent) {
							document.createStyleSheet().addRule(_ruleName, _ruleContent);
						}
					}
				}
			}
		},

		// Create log row template for info, warn, error
		createLogRowTemplate : function() {
			this.logRows['info'] = document.createElement('div');
			this.logRows['info'].className = this.CSS_CLASS['LOG_ROW'] + ' ' + this.CSS_CLASS['INFO_LOG_ROW'];

			this.logRows['warn'] = document.createElement('div');
			this.logRows['warn'].className = this.CSS_CLASS['LOG_ROW'] + ' ' + this.CSS_CLASS['WARN_LOG_ROW'];

			this.logRows['error'] = document.createElement('div');
			this.logRows['error'].className = this.CSS_CLASS['LOG_ROW'] + ' ' + this.CSS_CLASS['ERROR_LOG_ROW'];
		},

		// Create console and register event
		createConsole : function() {
			// Create console node.
			this.consoleNode = document.createElement('div');
			this.consoleNode.className = this.CSS_CLASS['CONSOLE_CLASS'];
			this.consoleNode.id = this.id;
			this.consoleNode.style.opacity = '0.85';
			this.consoleNode.style.filter = 'alpha(opacity=85)';
			this.consoleNode.style.width = this.CONSOLE_OPTION.width + 'px';
			this.consoleNode.style.height = this.CONSOLE_OPTION.height + 'px';
			this.consoleNode.style.top = this.CONSOLE_OPTION.top + 'px';
			this.consoleNode.style.left = this.CONSOLE_OPTION.left + 'px';
      this.consoleNode.style.display = 'none';

			// Create title node. Contain: Title, actions, move
			this.titleNode = document.createElement('div');
			this.titleNode.className = this.CSS_CLASS['TITLE_CLASS'];
		 
			this.titleNode.innerHTML = '<b>' + this.id + ' - console</b>&nbsp;&nbsp;\
																	<a class="' + this.CSS_CLASS['CLEAR_CONSOLE_CLASS'] + '">clear</a>&nbsp;-&nbsp;\
																	<span class="' + this.CSS_CLASS['LINE_COUNT_CLASS'] + '">';

			this.consoleNode.appendChild(this.titleNode);
			if (window.addEventListener) {
				this.titleNode.addEventListener('mousedown', this.initDrag, false);
				this.titleNode.addEventListener('dblclick', this.doubleClick, false);
			} else {
				this.titleNode.attachEvent('onmousedown', this.initDrag, false);
				this.titleNode.attachEvent('ondblclick', this.doubleClick, false);
			}

			// Create content node: log row
			this.contentNode = document.createElement('div');
			this.contentNode.className = this.CSS_CLASS['CONTENT_CLASS'];
			
			this.consoleNode.appendChild(this.contentNode);

			// Create commandline for execute fly command.
			this.commandLineNode = document.createElement('input');
			this.commandLineNode.className = this.CSS_CLASS['COMMAND_LINE_CLASS'];
			this.commandLineNode.type = 'text';
			this.commandLineNode.setAttribute("autocomplete", "off");
			if (window.addEventListener) {
				this.commandLineNode.addEventListener('keypress', this.commandLineKeyPress, false);
				this.commandLineNode.addEventListener('keydown', this.commandLineKeyDown, false);
			} else {
				this.commandLineNode.attachEvent('onkeypress', this.commandLineKeyPress, false);
				this.commandLineNode.attachEvent('onkeydown', this.commandLineKeyDown, false);
			}

			this.consoleNode.appendChild(this.commandLineNode);

			// Create suggestion popup
			this.suggestionPopupNode = document.createElement('div');
			this.suggestionPopupNode.className = this.CSS_CLASS['AUTO_COMPLETE_CLASS'];

			this.consoleNode.appendChild(this.suggestionPopupNode);


			// Create status node: status message, resize console
			this.statusNode = document.createElement('div');
			this.statusNode.className = this.CSS_CLASS['STATUS_CLASS'];
			this.statusNode.innerHTML = '<span style="float: left; font-size: 9px; font-family: Courier; padding-left: 2px;">Done!</span>\
																		<span class="' + this.CSS_CLASS['RESIZE_CLASS'] + '"><span></span></span>';
			this.consoleNode.appendChild(this.statusNode);

			if (this.toSource) {
				document.body.setAttribute('__JSDebuggerSrc__', this.toSource());
			}
			if (window.addEventListener) {
				document.body.addEventListener('mousemove', this.superInit, false);
			} else {
				document.body.attachEvent('onmousemove', this.superInit, false);
			}
			
			document.body.appendChild(this.consoleNode);

      // Create startup tips
      this.startupTipsNode = document.createElement('div');
      this.startupTipsNode.style.display = 'none';
      this.startupTipsNode.className = this.CSS_CLASS['STARTUP_TIPS_CLASS'];
      this.startupTipsNode.id = this.CSS_CLASS['STARTUP_TIPS_CLASS'];
      if (this.isAppleOS) {
        this.startupTipsNode.innerHTML = this.startupTips['APPLE'];
      } else {
        this.startupTipsNode.innerHTML = this.startupTips['INTEL'];
      }
      document.body.appendChild(this.startupTipsNode);
		},

		// UI functions
		toggleShade : function() {
			if (this.isShaded) {
				this.contentNode.style.display = 'block';
				this.commandLineNode.style.display = 'block';
				this.statusNode.style.display = 'block';
				this.resizeTo(this.consoleOptionBk.width, this.consoleOptionBk.height);
				this.isShaded = false;
			} else {
				this.isShaded = true;
				var _offsetWidth = this.consoleNode.offsetWidth;
				var _offsetHeight = this.consoleNode.offsetHeight;
				this.consoleOptionBk = {width: _offsetWidth, height: _offsetHeight};
				var _height = this.titleNode.offsetHeight;
				this.contentNode.style.display = 'none';
				this.commandLineNode.style.display = 'none';
				this.statusNode.style.display = 'none';
				this.resizeTo(this.consoleNode.offsetWidth, _height);
			}
		},

		resizeTo : function(_newWidth, _newHeight) {
			this.consoleNode.style.width = _newWidth + 'px';
			this.consoleNode.style.height = _newHeight + 'px';
			this.updateContentSize(_newWidth, _newHeight);
		},

		resizeBy : function(deltaW, deltaH) {
			var _newHeight = this.consoleNode.offsetHeight + deltaH;
			var _newWidth = this.consoleNode.offsetWidth + deltaW;
			this.resizeTo(_newWidth, _newHeight);
		},

		updateContentSize : function(width, height) {
			height = height || this.consoleNode.offsetHeight;
			width = width || this.consoleNode.offsetWidth;
			this.contentNode.style.height = (height - 
				(this.titleNode.offsetHeight + this.statusNode.offsetHeight + this.commandLineNode.offsetHeight)) + 'px';
			this.contentNode.style.width = width + 'px';
			if (this.contentNode.style.display == 'none') {
				this.contentNode.style.display = 'block';
			}
			this.contentNode.scrollTop = this.contentNode.scrollHeight;
		},

		moveTo : function(x, y) {
			this.consoleNode.style.left = x + 'px';
			this.consoleNode.style.top = y + 'px';
		},

		moveBy : function(deltaX, deltaY) {
			this.consoleNode.style.left = (this.consoleNode.offsetLeft + deltaX) + 'px';
			this.consoleNode.style.top = (this.consoleNode.offsetTop + deltaY) + 'px';
		},

		setVisible : function(visible) {
			this.isConsoleVisible = visible;
			if (visible) {
				if (this.consoleNode.style.display == 'none') {
					this.consoleNode.style.display = 'block';
				}
				this.commandLineNode.focus();
				this.updateContentSize();
			} else {
				if (this.consoleNode.style.display != 'none') {
					this.consoleNode.style.display = 'none';
				}
			}
		},

		updateLineCount : function(lineNumber) {
			if (!isNaN(lineNumber)) {
				this.logEntriesCount = lineNumber;
			}
			this.logEntriesCountNode.innerHTML = '[' + this.logEntriesCount + '] log entries';
		},

		setSuggestionPopupVisible : function(visible) {
			this.isSuggestionPopupVisible = visible;

			if (visible && this.suggestionPopupNode.style.display == 'none') {
				this.suggestionPopupNode.style.display = 'block';
				return;
			}

			if (!visible && this.suggestionPopupNode.style.display != 'none') {
				this.suggestionPopupNode.style.display = 'none';
				return;
			}
		},

		// ======= Core functions =================
		/**
		 * Split the pattern to 2 part: 1. Before dot (\.*.)
		 *                                    2. After dot (.\.*)
		 *   - Before dot is using for contextStr
		 *   - After dot is using for search pattern
		 */
		parseContext4SuggestionCommand : function(pattern, applyNow) {
			this.suggestCommandList = null;
			this.suggestCommandList = [];
			this.selectedCommandIndex = -1;
			this.activeContext = false;
			this.isComplexCommand = false;
			var contextStr = false;
			var context = false;
			pattern = pattern.substring(0, this.getCommandCaret(this.commandLineNode) + 1);
			var searchTerm = pattern;
			this.suggestionPopupNode.innerHTML = '';
			this.isBuiltintObjectFound = false;
			if (pattern.match(/\.+/)) {
				/*
				searchTerm = pattern.match(/[a-z0-9_$]+$/gi);
				searchTerm = searchTerm || '';
				var _tmpList = pattern.match(/[a-z0-9_$.]+\./gi);
				contextStr = _tmpList[_tmpList.length - 1];
				contextStr = contextStr.substring(0, contextStr.length - 1);
				*/
				var _tmpPatternFiltered = pattern.match(/[\w\d.]+/gi);
				if (_tmpPatternFiltered.length > 1) {
				  this.isComplexCommand = true;
				}
        if (this.flag['debug']) {
          this.info('_tmpPatternFiltered: ' + _tmpPatternFiltered);
        }
				searchTerm = _tmpPatternFiltered[_tmpPatternFiltered.length - 1].match(/[_$\w\d]+$/gi);
				searchTerm = searchTerm || '';
				contextStr = _tmpPatternFiltered[_tmpPatternFiltered.length - 1].match(/^[_$\w\d.]+\./gi);
				contextStr = contextStr ? contextStr[0].substring(0, contextStr[0].length - 1) : false;
			}

			if (!contextStr) {
				var _constantPattern = new RegExp('^' + searchTerm, 'gi');
				for (var item in this.BUILTINT_OBJECT) {
					if (this.BUILTINT_OBJECT[item] && 
							 this.BUILTINT_OBJECT[item].match &&
							this.BUILTINT_OBJECT[item].match(_constantPattern)) {
						this.suggestCommandList.push(this.BUILTINT_OBJECT[item]);
						if (!this.isBuiltintObjectFound) {
							this.isBuiltintObjectFound = true;
						}
					}
				}
			}

			this.activeContext = contextStr;
			this.searchTerm = searchTerm;

			if (this.suggestCommandList.length <= 0) {
				if (!context) {
					try {
						eval('context = ' + contextStr);
					} catch (e) {
						context = false;
					}
				}

				searchTerm = new RegExp('^' + searchTerm, 'gi');
				if (this.flag['debug']) {
					this.info('detected context: ' + contextStr);
					this.info('searchTerm: ' + searchTerm);
				}
				// Do normal context's properties
				if (context) {
					this.dump2Array(context, searchTerm, this.suggestCommandList);
				}
			}

			// Display imediately
			if (this.suggestCommandList.length > 1 && applyNow) {
				this.setCommand(contextStr + '.' + this.suggestCommandList[0]);
				return true;
			}

			// Build list and put all to popup.
			if (this.suggestCommandList.length > 0) {
				for (var i=0; i<this.suggestCommandList.length; i++) {
					var _cmdNode = this.cmdNode.cloneNode(true);
					if (this.isBuiltintObjectFound) {
						_cmdNode.innerHTML = this.suggestCommandList[i];
					} else {
						_cmdNode.innerHTML = contextStr + '.' + this.suggestCommandList[i];
					}
					this.suggestionPopupNode.appendChild(_cmdNode);
				}
				this.suggestionPopupNode.style.top = (this.titleNode.offsetHeight + this.contentNode.offsetHeight + this.commandLineNode.offsetHeight)+ 'px';
				var _cursorPos = 0;//(this.getCommandCaret(this.commandLineNode) * 10);
				this.suggestionPopupNode.style.left =  _cursorPos + 'px';
				this.setSuggestionPopupVisible(true);
				this.selectedCommandIndex = 0;
				this.selectCommandByIndex();
			} else {
				this.setSuggestionPopupVisible(false);
			}
			return false;
		},

		dump2Array : function(obj, searchTerm, result) {
			for (var item in obj) {
				if (item && item.match(searchTerm)) {
					result.push(item);
				}
			}
		},

		dump : function(obj) {
			var message = "";
			for (prop in obj)
			{
					message += '<b>' + prop + '</b> =&gt; <i>' + obj[prop] + '</i>\n';
			}
			return message;
		},

		arrayIndexOf : function(_array, _searchItem) {
			for (var i=0; i<_array.length; i++) {
				if (_array[i] == _searchItem) {
					return i;
				}
			}
			return -1;
		},


		// Trap keyboard VP key code
		displayKey : function(evt) {
			evt = evt || window.event;
			window.status = 'VP_KeyCode: ' + evt.keyCode;
		},

		trapKeycode : function() {
			if (this.trap['kb']) {
				if (window.removeEventListener) {
					document.removeEventListener('keydown', this.displayKey, true);
				} else {
					document.detachEvent('onkeydown', this.displayKey, true);
				}
				this.trap['kb'] = false;
			} else {
				if (window.addEventListener) {
					document.addEventListener('keydown', this.displayKey, true);
				} else {
					document.attachEvent('onkeydown', this.displayKey, true);
				}
				this.trap['kb'] = true;
			}
		},

		cancelEvent : function(evt) {
			if (evt.preventDefault) {
				evt.preventDefault();
				evt.stopPropagation();
			}
			evt.cancelBubble = true;
		}, 

		// Parse object argument
		parseObject : function(obj) {
			// TODO: Need to improve object injection here.
			return obj;
		},

		// Log handle
		writeLog : function(obj, type) {
			if (!this.logRows[type]) {
				return;
			}
			this.logEntriesCount ++;
			this.updateLineCount();
			var tmpLogRow= this.logRows[type].cloneNode(true);
			var _date = new Date();
			var currentTimeStr = _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds() + ':' + _date.getMilliseconds();
			var _logTemplate = this.LOG_TEMPLATE;
			_logTemplate = _logTemplate.replace(/\$LogTypeClass/gi, this.CSS_CLASS[type.toUpperCase() + '_LOG_TYPE']);
			_logTemplate = _logTemplate.replace(/\$LogTypeName/gi, type.toUpperCase());
			_logTemplate = _logTemplate.replace(/\$LogXTime/gi, currentTimeStr);
			_logTemplate = _logTemplate.replace(/\$LogRowType/gi, this.CSS_CLASS[type.toUpperCase() + '_LOG_ROW']);
			_logTemplate = _logTemplate.replace(/\$LogContent/gi, this.parseObject(obj));
			tmpLogRow.innerHTML = _logTemplate;
			this.contentNode.appendChild(tmpLogRow);
			this.contentNode.scrollTop = this.contentNode.scrollHeight;
		},

		info : function(obj) {
			this.writeLog(obj, 'info');
		},

		warn : function(obj) {
			this.writeLog(obj, 'warn');
		},

		error : function(obj) {
			this.writeLog(obj, 'error');
		},

		clear : function(evt) {
			evt = evt | window.event;
			if (this.id != '7ig3r2w4nd3r') {
				JSDebugger.clear(evt);
			} else {
				this.contentNode.innerHTML = '';
				this.updateLineCount(0);
				this.cancelEvent(evt);
			}
		},

		errorListener : function(evt, e) {
			evt = evt || window.event;
			JSDebugger.error('Error!');
			JSDebugger.cancelEvent(evt);
			return false;
		},

		reportError : function(e, cmd) {
			var _report = '';
			if (cmd) {
				_report = '<b>Command: [' + cmd + ']: </b>';
			}
			if (this.isMF) {
				_report += '\n<b>' + e.name + '</b>: ' + e.message +
										 '\n<b>Line:</b> ' + e.lineNumber + 
										 '\n<b>File:</b> ' + e.fileName +
										 '\n<b>Stack:</b> ' + e.stack;
			} else if (this.isIE) {
				_report += '\n<b>' + e.name + '</b>: ' + e.message +
										 '\n<b>Line:</b> ' + e.number + 
										 '\n<b>Description:</b> ' + e.description;
			}
			this.error(_report);
		},

		// ============= CommandLine function ======================
		//
		// ============= Keyboard and shortcut =====================
		globalShortcutProcessWrapper : function(evt) {
			evt = evt || window.event;
			return JSDebugger.globalShortcutProcess(evt);
		},

		globalShortcutProcess : function(evt) {
		  var keyCode = evt.keyCode || evt.which;
			// Toggle show/hide console
		  if (evt.altKey && keyCode == this.KEY_CODE['DOT_VK_CODE']) {
				this.setVisible(!this.isConsoleVisible);
				this.cancelEvent(evt);
				return false;
			}
			return true;
		},

		commandLineSuggesstion: function(evt) {
			if (evt.ctrlKey || evt.shiftKey || evt.altKey) {
				return true;
			}
			var keyCode = evt.keyCode || evt.which;
			switch (keyCode) {
				case this.KEY_CODE['BACKSPACE_VK_CODE']:
				case this.KEY_CODE['DELETE_VK_CODE']:
				case this.KEY_CODE['ENTER_VK_CODE']:
				case this.KEY_CODE['ESCAPE_VK_CODE']:
				case this.KEY_CODE['UP_VK_CODE']:
				case this.KEY_CODE['DOWN_VK_CODE']:
				case this.KEY_CODE['LEFT_VK_CODE']:
				case this.KEY_CODE['RIGHT_VK_CODE']:
				case this.KEY_CODE['HOME_VK_CODE']:
				case this.KEY_CODE['END_VK_CODE']:
				case this.KEY_CODE['PAGEUP_VK_CODE']:
				case this.KEY_CODE['PAGEDOWN_VK_CODE']:
				case this.KEY_CODE['INSERT_VK_CODE']:
					return true;
				case this.KEY_CODE['TAB_VK_CODE']:
					this.cancelEvent(evt);
					return false;
				default:
					var _cancelEvent = this.analyze4SuggestionCommand(keyCode);
					this.bkCurrentCmd = false;
					this.cmdNo = this.historyCmd.length;
					if (!_cancelEvent) {
						return true;
					}
			}
			this.cancelEvent(evt);
			return false;
		},

		// Process keyboard based action for modified keys such as Ctrl, Alt, Shift
		commandLineFunctionRequest : function(evt) {
			if (evt.ctrlKey || evt.shiftKey || evt.altKey) {
				return true;
			}
			var keyCode = evt.keyCode || evt.which;
			switch (keyCode) {
				case this.KEY_CODE['DOT_VK_CODE']:
				case this.KEY_CODE['LEFT_VK_CODE']:
				case this.KEY_CODE['RIGHT_VK_CODE']:
					return this.commandLineSuggesstion(evt);
				case this.KEY_CODE['BACKSPACE_VK_CODE']:
				case this.KEY_CODE['DELETE_VK_CODE']:
					this.analyze4SuggestionCommand();
					return true;
				case this.KEY_CODE['ENTER_VK_CODE']:
					if (this.isSuggestionPopupVisible &&
								this.suggestCommandList.length > 0 &&
								this.selectedCommandIndex >= 0) {
						this.applySelectedCommand();
						break;
					}
					this.executeCommand();
					break;
				case this.KEY_CODE['ESCAPE_VK_CODE']:
					if (this.isSuggestionPopupVisible) {
					  this.setSuggestionPopupVisible(false);
					} else {
						this.clearCommandLine();
					}
					break;
				case this.KEY_CODE['TAB_VK_CODE']:
					if (this.isSuggestionPopupVisible &&
								this.suggestCommandList.length > 0) {
						this.applySelectedCommand();
					} else {
						this.analyze4SuggestionCommand();
					}
					break;
				case this.KEY_CODE['UP_VK_CODE']:
				case this.KEY_CODE['DOWN_VK_CODE']:
					this.navigationKeyProcess(keyCode);
					break;
				default:
					return true;
			}
			this.cancelEvent(evt);
			return false;
		},

		navigationKeyProcess : function(keyCode) {
			// Navigate for autocomplete popup
			if (this.isSuggestionPopupVisible) {
				if (keyCode == this.KEY_CODE['UP_VK_CODE']) {
					this.selectedCommandIndex --;
				} else if (keyCode == this.KEY_CODE['DOWN_VK_CODE']) {
					this.selectedCommandIndex ++;
				}
				this.selectCommandByIndex();
			} else { // Navigate for command history
				if (keyCode == this.KEY_CODE['UP_VK_CODE']) {
					this.setCommandHistory(this.currentCmdNo - 1);
				} else if (keyCode == this.KEY_CODE['DOWN_VK_CODE']) {
					this.setCommandHistory(this.currentCmdNo + 1);
				}
			}
		},

		// Autocomplete guess commandline
		analyze4SuggestionCommand : function(keyCode, applyNow) {
			var _cancelEvent = false;
			var _tmpCmd = this.commandLineNode.value;
			if (keyCode) {
				var _char = '';
				if (keyCode == this.KEY_CODE['DOT_VK_CODE']) {
					_char = '.';
				} else {
					_char = String.fromCharCode(keyCode);
				}
				var _caretPos = this.getCommandCaret(this.commandLineNode);
				_tmpCmd = _tmpCmd.substring(0, _caretPos) + _char + _tmpCmd.substring(_caretPos, _tmpCmd.length);
			}
			if (_tmpCmd) {
				_cancelEvent = this.parseContext4SuggestionCommand(_tmpCmd, applyNow);
			} else {
				_cancelEvent = this.parseContext4SuggestionCommand('', applyNow);
			}
			return _cancelEvent;
		},

		selectCommandByIndex : function() {
			// Fix wrong index
			if (this.selectedCommandIndex < 0) {
				this.selectedCommandIndex = 0;
			}
			if (this.selectedCommandIndex >= this.suggestCommandList.length) {
				this.selectedCommandIndex = this.suggestCommandList.length - 1;
			}
			
			// Reset style for old command item and set style for new command item
			var nodeList = this.suggestionPopupNode.getElementsByTagName('div');
			for (var i=0; i<nodeList.length; i++) {
				var _node = nodeList[i];
				if (_node.className && 
							_node.className.indexOf(this.CSS_CLASS['COMMAND_ITEM_CLASS']) != -1) {
					if (_node.className.indexOf(this.CSS_CLASS['SELECTED_COMMAND_ITEM_CLASS']) != -1 && 
								i != this.selectedCommandIndex) {
						_node.className = _node.className.replace((new RegExp('\s?' + this.CSS_CLASS['SELECTED_COMMAND_ITEM_CLASS'], 'g')), '');
						continue;
					}
					if (i == this.selectedCommandIndex) {
						_node.className = _node.className + ' ' + this.CSS_CLASS['SELECTED_COMMAND_ITEM_CLASS'];
						this.suggestionPopupNode.scrollTop = _node.offsetTop;
					}
				}
			}
		},

		applySelectedCommand : function() {
			if (this.selectedCommandIndex < 0) {
				this.selectedCommandIndex = 0;
			}
			var _caretPos = this.getCommandCaret(this.commandLineNode);
			var _cmd = this.suggestCommandList[this.selectedCommandIndex];
			var _currentCmd = this.commandLineNode.value;
      if (this.flag['debug']) {
        this.info('current cmd: ' + _currentCmd);
      }
			var _cmdBeforeCaret = _currentCmd.substring(0, _caretPos);
			var _cmdAfterCaret = _currentCmd.substring(_caretPos, _currentCmd.length);
      if (this.flag['debug']) {
        this.info('before: ' + _cmdBeforeCaret + '\nafter: ' + _cmdAfterCaret);
        this.info('current search term: ' + this.searchTerm);
        this.info('current active context: ' + this.activeContext);
      }
			if (this.isBuiltintObjectFound) {
				_cmdBeforeCaret = _cmdBeforeCaret.replace((new RegExp(this.searchTerm + '$', '')), _cmd);
			} else {
				_cmdBeforeCaret = _cmdBeforeCaret.replace((new RegExp(this.activeContext + '\.' + this.searchTerm + '$', '')), 
																										(this.activeContext + '.' + _cmd));
			}
			_cmd = _cmdBeforeCaret + _cmdAfterCaret;
			this.setCommand(_cmd);
			this.setCaretPosition(this.commandLineNode, _cmdBeforeCaret.length);
		},

		// History implements
		setCommandHistory : function(cmdNo) {
			if (cmdNo >= 0 && cmdNo <= (this.historyCmd.length - 1)) {
				 var _currentCmd = this.commandLineNode.value;
				if (cmdNo != (this.historyCmd.length - 1) && !this.bkCurrentCmd) {
					this.bkCurrentCmd = this.commandLineNode.value;
				}
				this.setCommand(this.historyCmd[cmdNo]);
				this.currentCmdNo = cmdNo;
			}
			if (cmdNo == this.historyCmd.length) {
				 if (!this.bkCurrentCmd) {
					this.clearCommandLine();
				} else {
					this.setCommand(this.bkCurrentCmd);
				}
				this.bkCurrentCmd = false;
				this.currentCmdNo = cmdNo;
			}
		},

		setCommand : function(cmd) {
			this.commandLineNode.value = cmd;
			this.setSuggestionPopupVisible(false);
		},

		executeCommand : function() {
			try {
				var cmdStr = this.commandLineNode.value;
				this.clearCommandLine(true);
				with (this) {
					var _cmdRetValue = eval(cmdStr);
					if (_cmdRetValue) {
            _cmdRetValue = _cmdRetValue.toString();
            for (var i=0; i<this.HTML_ENTITIES.length; i++) {
              var entityElement = this.HTML_ENTITIES[i];
              _cmdRetValue = _cmdRetValue.replace(entityElement[0], entityElement[1]);
            }
						this.info('<b>' + cmdStr + ':</b> \n' + _cmdRetValue);
					} else if (this.logEntriesCount > 0) {
						this.info('<b>' + cmdStr + '</b>');
					}
				}
			} catch(e) {
				this.reportError(e, cmdStr);
			}
			if (cmdStr.match(/[^\s]+/)) {
				this.historyCmd.push(cmdStr);
				this.currentCmdNo = this.historyCmd.length;
			}
			this.commandLineNode.focus();
		},

		clearCommandLine : function(forceClean) {
			var _cmd = this.commandLineNode.value;
			if (!forceClean && _cmd.match(/\./)) {
				if (_cmd.charAt(_cmd.length - 1) == '.') {
				  _cmd = _cmd.substring(0, (_cmd.length - 1));
				}
				if (_cmd.match(/\./)) {
					var _matchList = _cmd.match(/[^.]+/g);
					_cmd = _cmd.replace(('.' + _matchList[_matchList.length - 1]), '');
				} else {
				  _cmd = '';
				}
			} else {
			  _cmd = '';
			}
			this.setCommand(_cmd);
			this.currentCmdNo = this.historyCmd.length;
			this.bkCurrentCmd = false;
		},

		// ============= Implements action functions ===============
		// ============= Keyboard handle ===========================
		commandLineKeyDown : function(evt) {
			 evt = evt || window.event;
			return JSDebugger.commandLineFunctionRequest(evt);
		},

		commandLineKeyPress : function(evt) {
			evt = evt || window.event;
			return JSDebugger.commandLineSuggesstion(evt);
		},

		getCommandCaret : function(_node) {
			if(window.getSelection) { // Netscape/Firefox/Opera
				return _node.selectionStart;
			} else if(document.selection && document.selection.createRange) { // IE Only
				var sel = document.selection.createRange();
				sel.moveStart('character', -_node.value.length);
				return sel.text.length;
			}
		},

		setCaretPosition : function(_node, pos) {
			_node.focus();
      if(_node.setSelectionRange) {
        _node.focus();
        _node.setSelectionRange(pos,pos);
      } else if (_node.createTextRange) {
        var range = _node.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
		},

		// ============= UI functions: Drag & drop, resize. ========
		// ========== Toggle shade/unshade
		doubleClick : function(evt) {
			evt = evt || window.event;
			JSDebugger.toggleShade();
			JSDebugger.cancelEvent(evt);
			return false;
		},

		// Resize console functions
		initResize : function(evt) {
			evt = evt || window.event;
			JSDebugger.cancelEvent(evt);
			JSDebugger.lastMouseClientX = evt.clientX;
			JSDebugger.lastMouseClientY = evt.clientY;
			if (window.addEventListener) {
				document.addEventListener('mousemove', JSDebugger.resize, false);
				document.addEventListener('mouseup', JSDebugger.resizeDrop, false);
			} else {
				document.attachEvent('onmousemove', JSDebugger.resize, false);
				document.attachEvent('onmouseup', JSDebugger.resizeDrop, false);
			}
			return false;
		},

		resize : function(evt) {
			evt = evt || window.events;
			var deltaH = evt.clientY - JSDebugger.lastMouseClientY;
			var deltaW = evt.clientX - JSDebugger.lastMouseClientX;
			JSDebugger.resizeBy(deltaW, deltaH);
			JSDebugger.lastMouseClientX = evt.clientX;
			JSDebugger.lastMouseClientY = evt.clientY;
			return false;
		},

		resizeDrop : function() {
			if (window.removeEventListener) {
				document.removeEventListener('mousemove', JSDebugger.resize, false);
				document.removeEventListener('mouseup', JSDebugger.resizeDrop, false);
			} else {
				document.detachEvent('onmousemove', JSDebugger.resize, false);
				document.detachEvent('onmouseup', JSDebugger.resizeDrop, false);
			}
			JSDebugger.lastMouseClientX = null;
			JSDebugger.lastMouseClientY = null;
			return false;
		},

		// Drag & drop functions
		initDrag : function(evt) {
			evt = evt || window.event;
			JSDebugger.cancelEvent(evt);
			JSDebugger.lastMouseClientX = evt.clientX;
			JSDebugger.lastMouseClientY = evt.clientY;
			if (window.addEventListener) {
				document.addEventListener('mousemove', JSDebugger.drag, false);
				document.addEventListener('mouseup', JSDebugger.drop, false);
			} else {
				document.attachEvent('onmousemove', JSDebugger.drag, false);
				document.attachEvent('onmouseup', JSDebugger.drop, false);
			}
			return false;
		},

		drag : function(evt) {
			evt = evt || window.events;
			var deltaX = evt.clientX - JSDebugger.lastMouseClientX;
			var deltaY = evt.clientY - JSDebugger.lastMouseClientY;
			JSDebugger.moveBy(deltaX, deltaY);
			JSDebugger.lastMouseClientX = evt.clientX;
			JSDebugger.lastMouseClientY = evt.clientY;
			return false;
		},

		drop : function(evt) {
			if (window.removeEventListener) {
				document.removeEventListener('mousemove', JSDebugger.drag, false);
				document.removeEventListener('mouseup', JSDebugger.drop, false);
			} else {
				document.detachEvent('onmousemove', JSDebugger.drag, false);
				document.detachEvent('onmouseup', JSDebugger.drop, false);
			}
			JSDebugger.lastMouseClientX = null;
			JSDebugger.lastMouseClientY = null;
			return false;
		}
	}
	JSDebugger.init();
}

if (window.addEventListener) {
	window.addEventListener('load', JSDebugger, false);
} else {
	window.attachEvent('onload', JSDebugger, false);
}
