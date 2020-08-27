window.alert = ((_alert) => {
    return function() {
        $('#topMessage').text(`Congratulations on solving this exercise!`);
        return _alert.apply(null, arguments);
    } 
})(window.alert);