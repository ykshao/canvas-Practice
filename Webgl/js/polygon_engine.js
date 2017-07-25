// forked from akm2's "エッジ検出のテスト" http://jsdo.it/akm2/89lF
(function() {
  'use strict';

  // Configs
  var PolygonGenerator = function(option){
    var config = {
      edgeDetectValue:70,
      pointRate:0.075,
      pointMaxNum:2500,
      blurSize:2,
      edgeSize:3,
      pixelLimit:180000,
      statusLog:false
    }

    $.extend(config,option);

    var image, source;
    var canvas, context;
    var imageIndex = 0; // 現在のプリセットのインデックス
    var message; // メッセージ表示用要素
    var generating = true; // 生成中であることを示す
    var timeoutId = null; // 非同期処理用

    // ログ表示用
    var generateTime = 0;

    // プリセットイメージをシャッフル
    // var imagePresets = (function(presets) {
    //     presets = presets.slice();
    //     var i = presets.length, j, t;
    //     while (i) {
    //         j = Math.random() * i | 0;
    //         t = presets[--i];
    //         presets[i] = presets[j];
    //         presets[j] = t;
    //     }
    //     return presets;
    // })(IMG_PRESETS);

    // ほかし用コンボリューション行列を作成
    var blur = (function(size) { 
      var matrix = [];
      var side = size * 2 + 1;
      var i, len = side * side;
      for (i = 0; i < len; i++) matrix[i] = 1;
      return matrix;
    })(config.blurSize);

    // エッジ検出用コンボリューション行列を作成
    var edge = (function(size) {
      var matrix = [];
      var side = size * 2 + 1;
      var i, len = side * side;
      var center = len * 0.5 | 0;
      for (i = 0; i < len; i++) matrix[i] = i === center ? -len + 1 : 1;
      return matrix;
    })(config.edgeSize);


    /**
     * Init
     */
    var completeFN = null;
    this.getPolygon = function(imgPath,complete){
      generating = true;
      if(complete)completeFN = complete;
      if(!canvas){
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');

        // canvas.id = 'canvas0';
        // canvas.style.position = 'absolute';
        // canvas.style.left = 0;
        // canvas.style.top = 0;
        // document.body.appendChild(canvas);

      }
      
      source = new Image();
      source.src = imgPath;
      source.onload = function(){
        sourceLoadComplete(); 
      }
    }

    /**
     * Document drop event handler
     */
    function documentDrop(e) {
      if (generating) return; // 生成中なら抜ける

      e.preventDefault();
      
      if (!window.FileReader) {
        alert('ドラッグ&ドロップによるファイル操作に未対応のブラウザです。');
        return;
      }
      
      // ドロップされた画像ファイルを指定してソースを設定
      var reader = new FileReader();
      reader.addEventListener('load', function(e) {
        setSource(e.target.result);
      }, false);
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }

    /**
     * Source load event handler
     * 
     * @see setSource()
     */
    function sourceLoadComplete(e) {
      // 画像サイズのチェック
      var width  = source.width;
      var height = source.height;
      var pixelNum = width * height;
      if (pixelNum > config.pixelLimit) {
        // サイズオーバーの場合はリサイズ
        var scale = Math.sqrt(config.pixelLimit / pixelNum);
        source.width  = width * scale | 0;
        source.height = height * scale | 0;
        
        // Log
        console.log('Source resizing ' + width + 'px x ' + height + 'px' + ' -> ' + source.width + 'px x ' + source.height + 'px');
      }
      
      // 生成を開始
      // if (timeoutId) clearTimeout(timeoutId);
      generateTime = new Date().getTime();
      console.log('Generate start...');
      // timeoutId = setTimeout(generate, 0);
      generate();
    }

    /**
     * 画像のサイズと位置を調整する
     * image の load, window の resize イベントハンドラ
     */
    function adjustImage() {
      image.removeAttribute('width');
      image.removeAttribute('height');
      var width  = image.width;
      var height = image.height;
      
      if (width > window.innerWidth || height > window.innerHeight) {
        var scale = Math.min(window.innerWidth / width, window.innerHeight / height);
        image.width  = width * scale | 0;
        image.height = height * scale | 0;
      }
      
      image.style.left = ((window.innerWidth - image.width) / 2 | 0) + 'px';
      image.style.top  = ((window.innerHeight - image.height) / 2 | 0) + 'px';
    }

    /**
     * ソースを設定する
     * 
     * @param {String} URL or data
     */
    function setSource(src) {
      // 生成中であることを示す
      // generating = true;
      // message.innerHTML = GENERATIONG_MESSAGE;
      
      if (source.src !== src) {
        // サイズを初期化
        source.removeAttribute('width');
        source.removeAttribute('height');
        source.src = src;
      } else {
        // 画像が同じ場合はイベントハンドラを強制的に実行
        sourceLoadComplete(null);
      }
    }


    /**
     * 画像を生成する
     */
    function generate(complete) {
      // 画像とキャンバスのサイズを設定して取得し, 検出を開始
      var width  = canvas.width = source.width;
      var height = canvas.height = source.height;

      context.drawImage(source, 0, 0, width, height);

      // 処理用 ImageData
      var imageData = context.getImageData(0, 0, width, height);
      // カラー参照用のピクセル情報
      var colorData = context.getImageData(0, 0, width, height).data;
      
      // フィルタを適用, グレースケール, ぼかし, エッジ検出
      Filter.grayscaleFilterR(imageData);
      Filter.convolutionFilterR(blur, imageData, blur.length);
      Filter.convolutionFilterR(edge, imageData);
      
      // エッジ上のポイントを検出
      var temp = getEdgePoint(imageData);
      // ログ表示用に記憶しておく
      var detectionNum = temp.length;
      console.log('////// ',detectionNum);
      var points = [];
      var i = 0, ilen = temp.length;
      var tlen = ilen;
      var j, limit = Math.round(ilen * config.pointRate);

      if (limit > config.pointMaxNum){
        limit = config.pointMaxNum;
      }

      // ポイントを間引く
      while (i < limit && i < ilen) {
        j = tlen * Math.random() | 0;
        points.push(temp[j]);
        temp.splice(j, 1);
        tlen--;
        i++;
      }
      
      // 三角形分割
      var delaunay = new Delaunay(width, height);
      var triangles = delaunay.insert(points).getTriangles();

      var t, p0, p1, p2, cx, cy;
      // 三角形を塗る
      for (ilen = triangles.length, i = 0; i < ilen; i++) {
        t = triangles[i];
        p0 = t.nodes[0]; p1 = t.nodes[1]; p2 = t.nodes[2];

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p0.x, p0.y);

        // 重心を取得してその座標の色で三角形を塗りつぶす
        cx = (p0.x + p1.x + p2.x) * 0.33333;
        cy = (p0.y + p1.y + p2.y) * 0.33333;
        
        j = ((cx | 0) + (cy | 0) * width) << 2;
        
        t.color = {
          r:colorData[j],
          g:colorData[j+1],
          b:colorData[j+2],
          a:colorData[j+3]
        };
        t.center = {x:cx,y:cy};

        context.fillStyle = 'rgb(' + colorData[j] + ', ' + colorData[j + 1] + ', ' + colorData[j + 2] + ')';
        context.fill();
      }
      
      // source.src = canvas.toDataURL('image/png');

      // ログを表示
      generateTime = new Date().getTime() - generateTime;
      console.log(
        // 'Generate completed ' + generateTime + 'ms, ' + 
        // points.length + ' points (out of ' + detectionNum + ' points, ' + (points.length / detectionNum * 100).toFixed(2) + ' %), ' +
        // triangles.length + ' triangles'
        // triangles
        detectionNum + ' points'
      );
      
      if(completeFN)completeFN(triangles,width,height);
      completeFN = null;
      // 生成の完了
      generating = false;

      // message.innerHTML = GENERAL_MESSAGE;
    }

    /**
     * エッジを判定してポイントを取得する
     * 
     * @param imageData エッジを検出するソースの ImageData
     * @return エッジ上にランダムに分布したポイントの配列
     * @see EDGE_DETECT_VALUE エッジと判定する 3x3 の明度の平均値
     */
    function getEdgePoint(imageData) {
        var width  = imageData.width;
        var height = imageData.height;
        var data = imageData.data;

        var E = config.edgeDetectValue// local copy

        var points = [];
        var x, y, row, col, sx, sy, step, sum, total;

        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                sum = total = 0;
                
                for (row = -1; row <= 1; row++) {
                    sy = y + row;
                    step = sy * width;
                    if (sy >= 0 && sy < height) {
                        for (col = -1; col <= 1; col++) {
                            sx = x + col;

                            if (sx >= 0 && sx < width) {
                                sum += data[(sx + step) << 2];
                                total++;
                            }
                        }
                    }
                }
                
                if (total) sum /= total;
                if (sum > E) points.push(new Array(x, y));
            }
        }

        return points;
    }

    /**
     * Filter
     */
    var Filter = {
        /**
         * グレイスケールフィルタ, ソース用なので 1 チャンネル (Red) のみに
         */
        grayscaleFilterR: function (imageData) {
            var width  = imageData.width | 0;
            var height = imageData.height | 0;
            var data = imageData.data;

            var x, y;
            var i, step;
            var r, g, b;

            for (y = 0; y < height; y++) {
                step = y * width;
                
                for (x = 0; x < width; x++) {
                    i = (x + step) << 2;
                    r = data[i];
                    g = data[i + 1];
                    b = data[i + 2];
                
                    data[i] = (Math.max(r, g, b) + Math.min(r, g, b)) >> 2;
                }
            }

            return imageData;
        },

        /**
         * 畳み込みフィルタ, ソース用なので 1 チャンネル (Red) のみに
         * 
         * @see http://jsdo.it/akm2/iMsL
         */
        convolutionFilterR: function(matrix, imageData, divisor) {
            matrix  = matrix.slice();
            divisor = divisor || 1;
            
            // 割る数を行列に適用する
            var divscalar = divisor ? 1 / divisor : 0;
            var k, len;
            if (divscalar !== 1) {
                for (k = 0, len = matrix.length; k < matrix.length; k++) {
                    matrix[k] *= divscalar;
                }
            }
        
            var data = imageData.data;
        
            // 参照用にオリジナルをコピー, グレースケールなので Red チャンネルのみ
            len = data.length >> 2;
            var copy = new Uint8Array(len);
            for (i = 0; i < len; i++) copy[i] = data[i << 2];
        
            var width  = imageData.width | 0;
            var height = imageData.height | 0;
            var size  = Math.sqrt(matrix.length);
            var range = size * 0.5 | 0;

            var x, y;
            var r, g, b, v;
            var col, row, sx, sy;
            var i, istep, jstep, kstep;

            for (y = 0; y < height; y++) {
                istep = y * width;

                for (x = 0; x < width; x++) {
                    r = g = b = 0;

                    for (row = -range; row <= range; row++) {
                        sy = y + row;
                        jstep = sy * width;
                        kstep = (row + range) * size;
                        
                        if (sy >= 0 && sy < height) {
                            for (col = -range; col <= range; col++) {
                                sx = x + col;

                                if (
                                    sx >= 0 && sx < width &&
                                    (v = matrix[(col + range) + kstep]) // 値が 0 ならスキップ
                                ) {
                                    r += copy[sx + jstep] * v;
                                }
                            }
                        }
                    }

                    // 値を挟み込む
                    if (r < 0) r = 0; else if (r > 255) r = 255;
                    
                    data[(x + istep) << 2] = r & 0xFF;
                }
            }
        
            return imageData;
        }  
    };

    /**
     * Delaunay
     * 
     * @see http://jsdo.it/akm2/wTcC
     */
    var Delaunay = (function() {

        /**
         * Node
         * 
         * @param {Number} x
         * @param {Number} y
         * @param {Number} id
         */
        function Node(x, y, id) {
            this.x = x;
            this.y = y;
            this.id = !isNaN(id) && isFinite(id) ? id : null;
        }

        Node.prototype = {
            eq: function(p) {
                var dx = this.x - p.x;
                var dy = this.y - p.y;
                return (dx < 0 ? -dx : dx) < 0.0001 && (dy < 0 ? -dy : dy) < 0.0001;
            },
        
            toString: function() {
                return '(x: ' + this.x + ', y: ' + this.y + ')';
            }
        };

        /**
         * Edge
         * 
         * @param {Node} p0
         * @param {Node} p1
         */
        function Edge(p0, p1) {
            this.nodes = [p0, p1];
        }

        Edge.prototype = {
            eq: function(edge) {
                var na = this.nodes,
                    nb = edge.nodes;
                var na0 = na[0], na1 = na[1],
                    nb0 = nb[0], nb1 = nb[1];
                return (na0.eq(nb0) && na1.eq(nb1)) || (na0.eq(nb1) && na1.eq(nb0));
            }
        };

        /**
         * Triangle
         * 
         * @param {Node} p0
         * @param {Node} p1
         * @param {Node} p2
         */
        function Triangle(p0, p1, p2) {
            this.nodes = [p0, p1, p2];
            this.edges = [new Edge(p0, p1), new Edge(p1, p2), new Edge(p2, p0)];
            
            // 今回は id は使用しない
            this.id = null;
            
            // この三角形の外接円を作成する
            
            var circle = this.circle = new Object();
            
            var ax = p1.x - p0.x, ay = p1.y - p0.y,
                bx = p2.x - p0.x, by = p2.y - p0.y,
                t = (p1.x * p1.x - p0.x * p0.x + p1.y * p1.y - p0.y * p0.y),
                u = (p2.x * p2.x - p0.x * p0.x + p2.y * p2.y - p0.y * p0.y);
            
            var s = 1 / (2 * (ax * by - ay * bx));
            
            circle.x = ((p2.y - p0.y) * t + (p0.y - p1.y) * u) * s;
            circle.y = ((p0.x - p2.x) * t + (p1.x - p0.x) * u) * s;

            var dx = p0.x - circle.x;
            var dy = p0.y - circle.y;
            circle.radiusSq = dx * dx + dy * dy;
        }


        /**
         * Delaunay
         * 
         * @param {Number} width
         * @param {Number} height
         */
        function Delaunay(width, height) {
            this.width = width;
            this.height = height;
        
            this._triangles = null;
        
            this.clear();
        }

        Delaunay.prototype = {
        
            clear: function() {
                var p0 = new Node(0, 0);
                var p1 = new Node(this.width, 0);
                var p2 = new Node(this.width, this.height);
                var p3 = new Node(0, this.height);
                            
                this._triangles = [
                    new Triangle(p0, p1, p2),
                    new Triangle(p0, p2, p3)
                ];
                
                return this;
            },
        
            insert: function(points) {
                var k, klen, i, ilen, j, jlen;
                var triangles, t, temps, edges, edge, polygon;
                var x, y, circle, dx, dy, distSq;
                
                for (k = 0, klen = points.length; k < klen; k++) {
                    x = points[k][0];
                    y = points[k][1];
                    
                    triangles = this._triangles;
                    temps = [];
                    edges = [];

                    for (ilen = triangles.length, i = 0; i < ilen; i++) {
                        t = triangles[i];

                        // 座標が三角形の外接円に含まれるか調べる
                        circle  = t.circle;
                        dx = circle.x - x;
                        dy = circle.y - y;
                        distSq = dx * dx + dy * dy;

                        if (distSq < circle.radiusSq) {
                            // 含まれる場合三角形の辺を保存
                            edges.push(t.edges[0], t.edges[1], t.edges[2]);
                        } else {
                            // 含まれない場合は持ち越し
                            temps.push(t);
                        }
                    }

                    polygon = [];

                    // 辺の重複をチェック, 重複する場合は削除する
                    edgesLoop: for (ilen = edges.length, i = 0; i < ilen; i++) {
                        edge = edges[i];

                        // 辺を比較して重複していれば削除
                        for (jlen = polygon.length, j = 0; j < jlen; j++) {
                            if (edge.eq(polygon[j])) {
                                polygon.splice(j, 1);
                                continue edgesLoop;
                            }
                        }

                        polygon.push(edge);
                    }

                    for (ilen = polygon.length, i = 0; i < ilen; i++) {
                        edge = polygon[i];
                        temps.push(new Triangle(edge.nodes[0], edge.nodes[1], new Node(x, y)));
                    }

                    this._triangles = temps;
                }
            
                return this;
            },
        
            getTriangles: function() {
                return this._triangles.slice();
            }
        };

        Delaunay.Node = Node;

        return Delaunay;
    })();

    /**
     * Point
     * 
     * @super Delaunay.Node
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.id = null;
    }

    Point.prototype = new Delaunay.Node();
  }
  PolygonGenerator.prototype.constructor = PolygonGenerator;
  
  
  /**
   * デバッグ用 log 関数, log.limit(number) で出力数を制限
   * 進捗の表示は通常の console.log
   */
  //var log=function(a){var b=0;var c=0;var d=function(){if(b){if(c>b)return;c++}a.console.log.apply(console,arguments)};d.limit=function(a){b=a};return d}(window)
  

  // Init
  // window.addEventListener('load', function(){}, false);
  // init(IMG_PRESETS[0]);
  this.PolygonGenerator = PolygonGenerator;
}).call(this);