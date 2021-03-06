 var can = document.getElementById('canvas');
 var ctx = can.getContext("2d");
 var mWidth = canvas.width;
 var mHeight = canvas.height;
 var mMaxOffset = 150;
 var mMaxRadius = 30;
 var mColor = '#fff';
 var mOffset = 0;
 var mDegrees = 0;
 setInterval(function() {
     drawCircle();
     rotate();
     var present = mDegrees / 360;
     if (present < 0.5) {
         mOffset = mMaxOffset * present; //改变圆心位置，使其靠近中心点
     } else {
         mOffset = mMaxOffset * (1 - present);
     }
     if (present <= 0.375 || present >= 0.625) drawPath(present); //当两圆接触时绘制粘合动画
 }, 30)

 function rotate() {
     canvas.style.transform = `rotate(${mDegrees}deg)`; //使canvas旋转
     mDegrees += 2;
     if (mDegrees == 360) {
         mDegrees = 0;
     }
 }

 function drawCircle() {
     ctx.clearRect(0, 0, mWidth, mHeight);
     ctx.beginPath();
     ctx.arc(mWidth / 2, mHeight / 2 - mOffset, mMaxRadius, 0, Math.PI * 2); //在中心点上方mOffset处画圆
     ctx.closePath();
     ctx.fillStyle = mColor;
     ctx.fill();
     ctx.beginPath();
     ctx.arc(mWidth / 2, mHeight / 2 + mOffset, mMaxRadius, 0, Math.PI * 2); //在中心点下方mOffset处画圆
     ctx.closePath();
     ctx.fill();
 }

 function drawPath(present) {
     ctx.beginPath();
     ctx.moveTo(mWidth / 2 - mMaxRadius, mHeight / 2 - mOffset); //从上圆最左点开始画线
     ctx.lineTo(mWidth / 2 + mMaxRadius, mHeight / 2 - mOffset); //到上圆最右点

     var suppoetOffset = -mMaxRadius;
     if (present < 0.25 || present > 0.75) { //当两球相交
         suppoetOffset = mMaxRadius;
     } else if (present <= 0.375) { //当两球刚分离时
         suppoetOffset = -(480 * present - 150);
     } else if (present >= 0.625) { //当两球快要接触时
         suppoetOffset = 480 * present - 330;
     }
     // 贝塞尔选点以中心点便宜30以内距离为控制点，另一圆边点为结束点
     ctx.quadraticCurveTo(mWidth / 2 + suppoetOffset, mHeight / 2, mWidth / 2 + mMaxRadius, mHeight / 2 + mOffset);
     ctx.lineTo(mWidth / 2 - mMaxRadius, mHeight / 2 + mOffset);
     ctx.quadraticCurveTo(mWidth / 2 - suppoetOffset, mHeight / 2, mWidth / 2 - mMaxRadius, mHeight / 2 - mOffset);
     ctx.closePath();
     ctx.fill();
 }
