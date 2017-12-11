const env = process.env.NODE_ENV;


module.exports = function(){
    switch(env){
        case 'development':
            return require('./config/webpack.dev')(env)
            break;
        case 'test':
            return require('./config/webpack.test')(env)
            break;
        case 'production':
            return require('./config/webpack.prod')(env)
            break;
        default :
            console.log("错误的环境参数");
            break;
    }
}
