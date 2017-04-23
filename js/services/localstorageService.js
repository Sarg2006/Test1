mainApp.factory("$localStorage",function(){
    return {
        setObj: function(key, obj){
            localStorage.setItem(key, JSON.stringify(obj));
        },
        getObj: function(key){
            return JSON.parse(localStorage.getItem(key));
        }
    }
});