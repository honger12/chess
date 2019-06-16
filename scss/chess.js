$(function () {
    let box = $('.box');
    let flag = true , ai = true;

    //定义两个对象，用于表示颜色和位置-->对象
    let black={} , white={} , blank={};
    //放棋子
    for(let i = 0 ; i < 15 ; i++){
        for(let j = 0 ; j < 15 ; j++){
            $('<div>').addClass('chess').attr('id',i+'_'+j).appendTo(box);
            blank[i+'_'+j] = true;
        }
    }


//    点击时改变（添加）棋子颜色 -->需要添加两个类

    box.on('click' , '.chess' ,function () {
        flag= !flag;
        //获取id值
        let coords = $(this).attr('id');
        //如果是点击过的就不可以在改变颜色
        if($(this).hasClass('black')||$(this).hasClass('white')){
            return ;
        } else{
            if(flag){
            //    下黑棋
                $(this).addClass('black');
                black[coords] = true;
                delete blank[coords];

                if(isSuccess(black , coords)>=5){
                    console.log('black_success');
                    box.off('click');
                }
            }else{
                $(this).addClass('white');
                white[coords]=true;
                delete blank[coords];
                if(isSuccess(white , coords)>=5){
                    console.log('white_success');
                    box.off('click');
                }
                if(ai){
                //    实现自动堵白旗
                    let pos = aifn();

                    $('#'+ pos).addClass('black');
                    black[pos]= true;
                    delete blank[pos];
                    if(isSuccess(black , pos)>=5){
                        console.log('black_success');
                        box.off('click');
                    }

                    flag = !flag;
                }
            }
        }
// 我的尝试
        /* else{
             if(flag){
                 // $(this).addClass('black');
                 //对象的判断
                 // black[coords]=true;
                 delete blank[coords];
                 console.log('black_x');
                 //    进行智能选择自动出牌位置
                 // if(ai){
                     let pos = aifn();
                     $('#'+pos).addClass('black');
                     black[pos] = true;
                 // }
                 success(black , pos);
             }else{
                 console.log('white_x');
                 $(this).addClass('white');
                 white[coords]=true;
                 delete blank[coords];
                 success(white , coords);
             }
         }*/

    //    同色五子连接即成功
    //    先写出五色连接情况：设想可以用一个函数实现

    })


    function isSuccess(obj,coords) {
    //定义四个方向产生的个数
        let sp = 1 , cz = 1 , yx = 1 , zx = 1;
    //    获取id并进行分解
        let [x,y] = coords.split('_');
        let i = x*1,j=y*1;//让i，j都是数字类型

        //sp水平方向
        while(obj[i + '_' + (++j)]){
            sp++;
        }
        j = y*1;
        while(obj[i + '_' + (--j)]){
            sp++;
        }
        j = y*1;

        //cz垂直方向
        while(obj[++i + '_' + j]){
            cz++;
        }
        i = x*1;
        while(obj[--i + '_' + j]){
            cz++;
        }
        i = x*1;


        //yx右斜方向
        while(obj[--i + '_' + (++j)]){
            yx++;
        }
        i = x*1;j = y*1;
        while(obj[++i + '_' + (--j)]){
            yx++;
        }
        i = x*1;j = y*1;

        //zx左斜方向
        while(obj[--i + '_' + (--j)]){
            zx++;
        }
        i = x*1;j = y*1;
        while(obj[++i + '_' + (++j)]){
            zx++;
        }

        // console.log(sp, cz, yx, zx);

        // console.log(Math.max(sp, cz, yx, zx));
       /* if(Math.max(sp,cz,yx,zx)===5){
            // box.off('click');
            if(black[coords]===true){
                console.log("黑棋胜利！！游戏结束");
                alert("黑棋胜利！！游戏结束");
            }else if(white[coords]===true){
                console.log("白棋胜利！！游戏结束");
                alert("白棋胜利！！游戏结束");
            }

            box.off('click');
            // alert("游戏结束");
        }*/

        return Math.max(sp,cz,yx,zx);

    }


//    智能下棋(返回下棋的位置)
    let pos1='' , pos2='';//表示要下棋的位置
    function aifn() {
        console.log('ssss');
        let blankScore1 = 0 , blankScore2 = 0;
    //    便利空白的位置

        for(let i in blank){
            //    判断黑色在空白位置处的值--->得到最大值
            let score1 = isSuccess(black,i);
            if(score1 > blankScore1){
                blankScore1 = score1;
                pos1 = i;
            }
            //    判断白色在空白位置处的值--->得到最大值
            let score2 = isSuccess(white,i);
            if(score2 > blankScore2){
                blankScore2 = score2;
                pos2 = i;
            }
        }
        //机器人只得是黑棋
        //处于优势

       /* if(blankScore1 >= blankScore2){
            return pos1;
        }else {
            return pos2;
        }*/
       // 可以写成下面的形式
       return blankScore1 >= blankScore2 ? pos1: pos2;

    }


//    五子连成线成功的提示
    function success(obj,coords) {
        if(isSuccess(obj,coords)===5){
            // box.off('click');
            if(black[coords]===true){
                console.log("黑棋胜利！！游戏结束");
                alert("黑棋胜利！！游戏结束");
            }else if(white[coords]===true){
                console.log("白棋胜利！！游戏结束");
                alert("白棋胜利！！游戏结束");
            }

            box.off('click');
            // alert("游戏结束");
        }
    }
})