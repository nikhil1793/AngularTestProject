/**
 * Created by Nikhil on 07-05-2016.
 */

module.exports=  function(){

    return [
        require('./main.js'),
        require('./module.js'),
        require('./controller/controller1.js'),
        require('./controller/controller2.js'),
        require('./services/_index.js')
    ];

}();
