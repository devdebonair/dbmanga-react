module.exports = function debounce(func, wait, immediate)
{
	var timeout;
	return function()
	{
		var self = this; 
		var args = arguments;

		var later = function() 
		{
			timeout = null;
			if(!immediate)
			{
				func.apply(self, args);
			}
		};

		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		
		if(callNow)
		{
			func.apply(self, args);
		}
	};
};