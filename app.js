"use strict";

function init() {


	Homey.log("AdvSpeech - init done");

}

module.exports.init = init

Homey.manager('flow').on('action.voice_output', function( callback, args ){
	var str=args.input;
	var arr_t = str.toString().split(';');//Split string at ;
	var randval=arr_t[Math.floor(Math.random()*(arr_t.length))];//Get a random entry from (0 - array_length)
	Homey.manager('speech-output').say( randval );
	callback( null, true ); // we've fired successfully
});

Homey.manager('flow').on('condition.voice_output', function( callback, args ){
	var str=args.input;
	var arr_t = str.toString().split(';');//Split string at ;
	var randval=arr_t[Math.floor(Math.random()*(arr_t.length))];//Get a random entry from (0 - array_length)
	Homey.manager('speech-input').ask(randval, function( err, result ) {
        if( err ) return Homey.error(err);
		if (result == 'yes'){
			callback( null, true );
		}
		if (result == 'no'){
			callback( null, false );
		}
        // result is the transcript of the user, in this case it might be `Mike`
    });
	
});