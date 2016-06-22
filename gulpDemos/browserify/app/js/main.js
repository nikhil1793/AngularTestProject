/**
 * Created by Nikhil on 07-05-2016.
 */


(function(){

    'use strict';

    function main(){

        console.log('This is main ');

    };

    function main2(){

        console.log('Changed in Main Controller');

    }

    window.addEventListener('load',function(){

        var button=document.getElementById('click');
        button.addEventListener('click',function(){

            //alert('button is clicked... changes updated');
            document.getElementById('messageId').value='Button is Clicked';
 
        });

    });

})();