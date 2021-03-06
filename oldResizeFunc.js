/**
 * Created by nkapravchuk on 26.10.14.
 */

function runGame() {


    var standartWidth = 640;
    var standartHeight = 960;

    /*
     *   x = 75
     *   y = 75
     *
     *
     *   detect max size of Width/Height
     *
     * */
    var deviceWidth = 0;
    var deviceHeight = 0;
    var scaleWidthFactor;
    var scaleHeightFactor;
    if (navigator.userAgent.indexOf("iPhone") + 1) {
        deviceWidth = screen.availWidth;
        deviceHeight = screen.availHeight;

        scaleWidthFactor = deviceWidth / standartWidth;
        scaleHeightFactor = deviceHeight / standartHeight;

    }
    else if (navigator.userAgent.indexOf("Android") + 1) {
        deviceHeight = window.innerHeight;
        deviceWidth = window.innerWidth;

        scaleWidthFactor = (deviceWidth / standartWidth)//window.devicePixelRatio;
        scaleHeightFactor = (deviceHeight / standartHeight)//window.devicePixelRatio;
    }

    var scaleFactor = Math.max(scaleHeightFactor, scaleWidthFactor);

    var renderer = new PIXI.CanvasRenderer(deviceWidth, deviceHeight);//
    document.body.appendChild(renderer.view);
    renderer.resize(640, 960)

    var stage = new PIXI.Stage();

    stage.setBackgroundColor(0x0000FF);

//    var img_shadow = new Image();
//
//    img_shadow.src = "./img/table_shadow.png";
//
//    var tableShadowBaseTexture = new PIXI.BaseTexture(img_shadow);
//    var tableShadowTexture = new PIXI.Texture(tableShadowBaseTexture, new PIXI.Rectangle(0, 0, 640, 960));
    var tableShadowSprite = new PIXI.Sprite.fromImage("./img/table_shadow.png");

    tableShadowSprite.anchor.x = 0.5
    tableShadowSprite.anchor.y = 0.5

//    var img_table = new Image();
//
//    img_table.src = "./img/table_top.png";
//
//    var tableBaseTexture = new PIXI.BaseTexture(img_table);
//    var tableTexture = new PIXI.Texture(tableBaseTexture, new PIXI.Rectangle(0, 0, 640, 960));
    var tableSprite = new PIXI.Sprite.fromImage("./img/table_top.png");

    tableSprite.anchor.x = 0.5
    tableSprite.anchor.y = 0.5

    tableShadowSprite.addChild(tableSprite)


//    var img_chip = new Image();
//
//    img_chip.src = "./img/chip_blue_big_1.png";
//    var chipBaseTexture = new PIXI.BaseTexture(img_chip);
//    var chipTexture = new PIXI.Texture(chipBaseTexture, new PIXI.Rectangle(0, 0, 100, 100));
    var chipsSprites = [];
    var ydelta = -deviceHeight/2
    var xdelta = -deviceWidth/2
    for(var i = 0;i<1; i++){
        var chipSprite = new PIXI.Sprite.fromImage("./img/chip_blue_big_1.png");

        chipSprite.scale.x = 1.5;
        chipSprite.scale.y = 1.5;

        chipSprite.anchor.x = 0.5
        chipSprite.anchor.y = 0.5

        chipSprite.position.x = 240//xdelta + i*6;//240
        chipSprite.position.y = 300//ydelta + i*6;//300

        chipSprite.interactive = true;
        chipSprite.buttonMode = true;

        chipSprite.movetypeX = 15;

        createEventlistenersForChip(chipSprite)

        chipsSprites.push(chipSprite)
    }

//    var img_slider_back_left = new Image();
//    img_slider_back_left.src = "./img/slider/sliderback_left.png";
//
//    var sliderBackLeftBaseTexture = new PIXI.BaseTexture(img_slider_back_left);
//    var sliderBackLeftTexture = new PIXI.Texture(sliderBackLeftBaseTexture, new PIXI.Rectangle(0, 0, 100, 100));
    var sliderBackLeftSprite = new PIXI.Sprite.fromImage("./img/slider/sliderback_left.png");

    sliderBackLeftSprite.position.x = 0;
    sliderBackLeftSprite.position.y = deviceHeight;

    sliderBackLeftSprite.anchor.x = 0
    sliderBackLeftSprite.anchor.y = 1

    sliderBackLeftSprite.scale.x = 0.5
    sliderBackLeftSprite.scale.y = 0.5

    var minusButtonSprite = new PIXI.Sprite.fromImage("./img/slider/slider_minus.png");
    minusButtonSprite.anchor.x = 0;
    minusButtonSprite.anchor.y = 1;

    minusButtonSprite.scale.x = 1
    minusButtonSprite.scale.y = 1

    sliderBackLeftSprite.addChild(minusButtonSprite);





//    console.log("minus")
//    console.log(minusButtonSprite)



//    var img_slider_back_right = new Image();
//    img_slider_back_right.src = "./img/slider/sliderback_right.png";
//
//    var sliderBackRightBaseTexture = new PIXI.BaseTexture(img_slider_back_right);
//    var sliderBackRightTexture = new PIXI.Texture(sliderBackRightBaseTexture, new PIXI.Rectangle(0, 0, 100, 100));
    var sliderBackRightSprite = new PIXI.Sprite.fromImage("./img/slider/sliderback_right.png");

    sliderBackRightSprite.position.x = deviceWidth;
    sliderBackRightSprite.position.y = deviceHeight;

    sliderBackRightSprite.anchor.x = 1
    sliderBackRightSprite.anchor.y = 1

    sliderBackRightSprite.scale.x = 0.5
    sliderBackRightSprite.scale.y = 0.5

    var plusButtonSprite = new PIXI.Sprite.fromImage("./img/slider/slider_plus.png");
    plusButtonSprite.anchor.x = 1;
    plusButtonSprite.anchor.y = 1;

    plusButtonSprite.scale.x = 1
    plusButtonSprite.scale.y = 1

    sliderBackRightSprite.addChild(plusButtonSprite)
//    var img_slider_back = new Image();
//    img_slider_back.src = "./img/slider/slider_back.png";
//
//    var sliderBackBaseTexture = new PIXI.BaseTexture(img_slider_back);
//    var sliderBackTexture = new PIXI.Texture(sliderBackBaseTexture, new PIXI.Rectangle(0, 0, 2, 100));

    var sliderSprite = new PIXI.Sprite.fromImage("./img/slider/slider.png");

    sliderSprite.position.x = 114;
    sliderSprite.position.y = deviceHeight;

    sliderSprite.anchor.x = 0
    sliderSprite.anchor.y = 1

    sliderSprite.scale.x = 1

    var sliderBackSprite = new PIXI.Sprite.fromImage("./img/slider/slider_back.png");

    sliderBackSprite.position.x = 100;
    sliderBackSprite.position.y = deviceHeight;

    sliderBackSprite.anchor.x = 0
    sliderBackSprite.anchor.y = 1

    sliderBackSprite.scale.x = 1

    var sliderBlueSprite = new PIXI.Sprite.fromImage("./img/slider/slider_glow0.png");

    sliderBlueSprite.position.x = 110;
    sliderBlueSprite.position.y = deviceHeight;

    sliderBlueSprite.anchor.x = 0
    sliderBlueSprite.anchor.y = 1

    sliderBlueSprite.scale.x = 1

    var menuSprite = new PIXI.Sprite.fromImage("./img/menu.png");
    menuSprite.anchor.x = 0;
    menuSprite.anchor.y = 0;
    menuSprite.position.x = 5;
    menuSprite.position.y = 10;
    menuSprite.texture.width = 57
    menuSprite.texture.height = 42
    //menuSprite.scale.y =

    var topMenuBlackSprite = new PIXI.Sprite.fromImage("./img/slider/slider_back.png");
    topMenuBlackSprite.anchor.x = 0;
    topMenuBlackSprite.anchor.y = 0;
    topMenuBlackSprite.position.x = 0;
    topMenuBlackSprite.position.y = 0;
    topMenuBlackSprite.scale.x = 10
    topMenuBlackSprite.scale.y = 0.5
//    topMenuBlackSprite.addChild(menuSprite)
    //topMenuBlackSprite.height = 100
    //topMenuBlackSprite.texture.width = 2


    var potbet50Sprite = new PIXI.Sprite.fromImage("./img/potbet_50.png");
    potbet50Sprite.position.x = -180;
    potbet50Sprite.position.y = -150;

    var potbet75Sprite = new PIXI.Sprite.fromImage("./img/potbet_75.png");
    potbet75Sprite.position.x = -55;
    potbet75Sprite.position.y = -150;

    var potbet100Sprite = new PIXI.Sprite.fromImage("./img/potbet_100.png");
    potbet100Sprite.position.x = 70;
    potbet100Sprite.position.y = -150;

    var plateBaseSprite = new PIXI.Sprite.fromImage("./img/plate_base.png");

    plateBaseSprite.anchor.x = 0.5
    plateBaseSprite.anchor.y = 0.5
    plateBaseSprite.position.y = 300

    var platePlayerSprite = new PIXI.Sprite.fromImage("./img/plate_player.png");
    platePlayerSprite.anchor.x = 0.5
    platePlayerSprite.anchor.y = 0.5
    plateBaseSprite.addChild(platePlayerSprite)

    var plateWinSprite = new PIXI.Sprite.fromImage("./img/plate_win_bg.png");
    plateWinSprite.anchor.x = 0.5
    plateWinSprite.anchor.y = 0.5
    plateBaseSprite.addChild(plateWinSprite)

    var playerAmount = new PIXI.Text("150$", {fill:"white"})
    playerAmount.anchor.x = 0.5;
    playerAmount.anchor.y = 0;
    playerAmount.position.y = 10

    plateBaseSprite.addChild(playerAmount)



    var plateBaseUser2Sprite = new PIXI.Sprite.fromImage("./img/plate_base.png");

    plateBaseUser2Sprite.anchor.x = 0.5
    plateBaseUser2Sprite.anchor.y = 0.5
    plateBaseUser2Sprite.position.x = 250

    var plateUser2Sprite = new PIXI.Sprite.fromImage("./img/plate_player.png");
    plateUser2Sprite.anchor.x = 0.5
    plateUser2Sprite.anchor.y = 0.5
    plateBaseUser2Sprite.addChild(plateUser2Sprite)

    var UserName = new PIXI.Text("User Name", {fill:"red",font:"bold 20px Arial"})
    UserName.anchor.x = 0.5;
    UserName.anchor.y = 0;
    UserName.position.y = 10

    plateBaseUser2Sprite.addChild(UserName)


    var plateBaseUser3Sprite = new PIXI.Sprite.fromImage("./img/plate_base.png");

    plateBaseUser3Sprite.anchor.x = 0.5
    plateBaseUser3Sprite.anchor.y = 0.5
    plateBaseUser3Sprite.position.x = -250

    var plateUser3Sprite = new PIXI.Sprite.fromImage("./img/plate_player.png");
    plateUser3Sprite.anchor.x = 0.5
    plateUser3Sprite.anchor.y = 0.5
    plateBaseUser3Sprite.addChild(plateUser3Sprite)

    var UserName2 = new PIXI.Text("User Name2", {fill:"red",font:"bold 20px Arial"})
    UserName2.anchor.x = 0.5;
    UserName2.anchor.y = 0;
    UserName2.position.y = 10

    plateBaseUser3Sprite.addChild(UserName2)

    var plateBaseUser4Sprite = new PIXI.Sprite.fromImage("./img/plate_base.png");

    plateBaseUser4Sprite.anchor.x = 0.5
    plateBaseUser4Sprite.anchor.y = 0.5
    plateBaseUser4Sprite.position.y = -320

    var plateUser4Sprite = new PIXI.Sprite.fromImage("./img/plate_player.png");
    plateUser4Sprite.anchor.x = 0.5
    plateUser4Sprite.anchor.y = 0.5
    plateBaseUser4Sprite.addChild(plateUser4Sprite)

    var UserName3 = new PIXI.Text("User Name3", {fill:"red",font:"bold 20px Arial"})
    UserName3.anchor.x = 0.5;
    UserName3.anchor.y = 0;
    UserName3.position.y = 10

    plateBaseUser4Sprite.addChild(UserName3)


    var displayObjCont = new PIXI.DisplayObjectContainer();
    displayObjCont.position.x = 1;
    displayObjCont.position.y = 1;
//    tableSprite.addChild(minusButtonSprite)
    displayObjCont.addChild(tableShadowSprite)


    displayObjCont.addChild(potbet50Sprite)
    displayObjCont.addChild(potbet75Sprite)
    displayObjCont.addChild(potbet100Sprite)

    displayObjCont.addChild(plateBaseSprite)
    displayObjCont.addChild(plateBaseUser2Sprite)
    displayObjCont.addChild(plateBaseUser3Sprite)
    displayObjCont.addChild(plateBaseUser4Sprite)

    for(var i=0; i<chipsSprites.length; i++){
        displayObjCont.addChild(chipsSprites[i])
    }
    stage.addChild(displayObjCont)
    stage.addChild(sliderBackSprite)
//    stage.addChild(sliderBlueSprite)
//    stage.addChild(sliderSprite)

    stage.addChild(sliderBackLeftSprite)
    stage.addChild(sliderBackRightSprite)

    stage.addChild(topMenuBlackSprite)
    stage.addChild(menuSprite)
//    stage.addChild(minusButtonSprite)
//console.log("displayObjCont")
//    console.log(displayObjCont)
    resize();
    var movetypeX = 5;
    requestAnimationFrame(animate);


    function animate() {
        //bunny.rotation += 0.01;

        renderer.render(stage);
        //moveChip()
        requestAnimationFrame(animate);
    }

    function moveChip(){
        deviceHeight = window.innerHeight;
        deviceWidth = window.innerWidth;

        for(var i=0; i<chipsSprites.length; i++){

            var chipSprite = chipsSprites[i];
            chipSprite.rotation += 0.01
            if(chipSprite.position.x <= -displayObjCont.position.x){

                chipSprite.movetypeX = 15;
                chipSprite.position.x +=chipSprite.movetypeX;
            }
            else if(chipSprite.position.x >= displayObjCont.position.x){
                chipSprite.movetypeX = -15;
                chipSprite.position.x +=chipSprite.movetypeX;
            }
            else
                chipSprite.position.x +=chipSprite.movetypeX;
        }
//        console.log(chipSprite.position.x)
    }

    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', resize, false);

    function resize(e) {

        setTimeout(function(){
            var standartWidth = 960;
            var standartHeight = 640;

            /*
             *   x = 75
             *   y = 75
             *
             *
             *   detect max size of Width/Height
             *
             * */
            var deviceWidth = 0;
            var deviceHeight = 0;
            var scaleWidthFactor;
            var scaleHeightFactor;

            deviceHeight = window.innerHeight;
            deviceWidth = window.innerWidth;

            scaleWidthFactor = (deviceWidth / standartWidth)//window.devicePixelRatio;
            scaleHeightFactor = (deviceHeight / standartHeight)//window.devicePixelRatio;

            var scaleDeltaMin = Math.min(scaleWidthFactor, scaleHeightFactor);
            var scaleDeltaMax = Math.max(scaleWidthFactor, scaleHeightFactor);
            console.log(deviceWidth)
            console.log(deviceHeight)

            renderer.resize(deviceWidth, deviceHeight)
            displayObjCont.children[0].rotation = 1.55
            displayObjCont.children[7].position.y = -200
            displayObjCont.children[4].position.y = 200
            displayObjCont.scale.x = scaleDeltaMin
            displayObjCont.scale.y = scaleDeltaMin
            displayObjCont.position.x = deviceWidth / 2;
            displayObjCont.position.y = deviceHeight / 2;

            console.log(displayObjCont)

            sliderBackLeftSprite.scale.x = scaleDeltaMin;
            sliderBackLeftSprite.scale.y = scaleDeltaMin;

            sliderBackLeftSprite.position.x = 0;
            sliderBackLeftSprite.position.y = deviceHeight;

            sliderBackRightSprite.scale.x = scaleDeltaMin;
            sliderBackRightSprite.scale.y = scaleDeltaMin;

            sliderBackRightSprite.position.x = deviceWidth;
            sliderBackRightSprite.position.y = deviceHeight;

            sliderBackSprite.position.x = sliderBackLeftSprite.texture.width * sliderBackLeftSprite.scale.x;
            sliderBackSprite.position.y = deviceHeight;

            sliderBackSprite.scale.y = scaleDeltaMin
            var widthLeftBlack = sliderBackLeftSprite.texture.width * sliderBackLeftSprite.scale.x;

            sliderBackSprite.scale.x = Math.ceil((deviceWidth - widthLeftBlack * 2) / sliderBackSprite.texture.width)



            topMenuBlackSprite.scale.x = Math.ceil(deviceWidth)/topMenuBlackSprite.texture.width
            topMenuBlackSprite.scale.y = scaleDeltaMin/2

            menuSprite.scale.x = scaleDeltaMin;
            menuSprite.scale.y = scaleDeltaMin;
            menuSprite.position.x = menuSprite.position.x * scaleDeltaMin;
            menuSprite.position.y = menuSprite.position.y * scaleDeltaMin;

//            console.log(menuSprite)
//            console.log(topMenuBlackSprite)

        },250);
//        console.log(e)


    }


    function createEventlistenersForChip(chip) {
        chip.mousedown = chip.touchstart = function (data) {
            //		data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.9;
            this.dragging = true;
        };

        // set the events for when the mouse is released or a touch is released
        chip.mouseup = chip.mouseupoutside = chip.touchend = chip.touchendoutside = function (data) {
            this.alpha = 1
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
        };

        // set the callbacks for when the mouse or a touch moves
        chip.mousemove = chip.touchmove = function (data) {

            if (this.dragging) {
//                console.log(this);
                // need to get parent coords..
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x//-50;
                this.position.y = newPosition.y//-50;
            }
        }
    }

}
