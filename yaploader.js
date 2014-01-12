
/**
* Constructor for Preloader Class
* @class
* @classdesc Preloads required assets
* @param {PreloadItems} items The items to preload.
*/
function Preloader(items) {
	var _Items = items;
	var _LoadedCount = 0;
	this.preloadComplete = null;
	var _PreloadedItems = new Array();

	/**
	* Starts the preload process. 
	*/
	this.preload = function() 
	{
		var _this = this;
		if (_Items != null)
		{
			for (var i=0; i< _Items.length; i++)
			{
				var item = _Items[i];
				switch (item.type)
				{

					case "image":
						var image = new Image();
						$(image).on('load', {id: item.identifier, imageRef: image},function (event) {
							_this.itemLoaded(event.data.id, event.data.imageRef);
						});
						image.src = item.src;

						break;
					case "audio":
						var audio = new Audio();
						$(audio).on('canplaythrough', {id: item.identifier, audioRef: audio},function (event) {
  							_this.itemLoaded(event.data.id, event.data.audioRef);
						});

						audio.src = item.src;
												
						break;
					case "video":
						var video = new Video();
						$(video).on('canplaythrough', {id: item.identifier, videoRef: audio},function (event) {
  							_this.itemLoaded(event.data.id, event.data.videoRef);
						});
						
						video.src = item.src;
						break;
				}
			}
		
		} else {
			//Nothing to load so fire onload complete
			this.onPreLoadComplete();
		}
		
	
	}
	
	/**
	* Once an item has loaded used to get item
	* @param {string} id The item to get
	*/
	this.getItem = function(id) {
		return _PreloadedItems[id];
	}
	
	/**
	* Called when an item has loaded
	* @param {string} id The id of the item that has loaded.
	* @param {Object} item The item that has loaded.
	*/
	this.itemLoaded = function(id, item) {
		_LoadedCount++;
		_PreloadedItems[id] = item;
		this.onProgressChanged();
		if (_LoadedCount == _Items.length)
		{
			this.onPreLoadComplete();
		}
	}
	
	/**
	* Fires an event when all required assets have loaded completly
	*/
	this.onPreLoadComplete = function() {
		if (this.preloadComplete !=null) {
			this.preloadComplete(true);
		}
	}
	
	/**
	* Fires an optional progress event. Useful for a progress bar.
	*/
	this.onProgressChanged= function() {
		if (this.progressChanged !=null) {
			var percentDone = (_LoadedCount/ _Items.length) * 100;
			this.progressChanged(percentDone);
		}
		
	}
}