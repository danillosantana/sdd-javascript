class SistemaFactory {

    static create(objeto, props) {
        return new Proxy(objeto, {
            get : function(target, prop, receiver) {
                if ( (props.includes(prop)) && typeof(target[prop]) == typeof(Function)){
                    return function() {    
                        Reflect.apply(target[prop], target, arguments);       
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }
}