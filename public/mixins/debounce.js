module.exports = {

	debounce: function(func, delay, immediate)
	{
		var timeoutID;

		return function() {
			
			var args = arguments;
			
			var debounced = function() {
				timeoutID = null;
				if(!immediate)
				{
					func.apply(this, args);
				}
			}.bind(this);

			var callNow = immediate && !timeoutID;
			
			clearTimeout(timeoutID);
			timeoutID = setTimeout(debounced, (delay || 100));
			
			if(callNow)
			{
				func.apply(this, args);
			}
		};
	}
};