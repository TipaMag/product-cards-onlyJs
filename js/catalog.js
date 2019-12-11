let productsCatalog = {
	"el1" : {
		type : "phone",
		name : "IPhone 5",
		price : 599,
		img : "img/iphone-5.jpg",
		color : ['Белый', 'Черный', 'Красный'],
		memory : ['32', '64'],
		quantity : 5,
	},
	"el2" : {
		type : "phone",
		name : "IPhone 6",
		price : 699,
		img : "img/iphone-6.jpg"
	},
	"el3" : {
		type : "phone",
		name : "IPhone 7",
		price : 799,
		img : "img/iphone-7.jpg"
	},
	"el4" : {
		type : "clock",
		name : "Apple Watch Series 3",
		price : 399,
		img : "img/apple-watch-3.jpg"
	},
	"el5" : {
		type : "laptop",
		name : "Dell XPS",
		price : 1299,
		img : "img/dell-xps.jpeg"
	},
	"el6" : {
		type : "accesories",
		name : "Apple Lightning Adapter",
		price : 19,
		img : "img/apple-lightning.jpg"
	}
};




// console.log(productsCatalog);

// let catalogJson = JSON.stringify(productsCatalog, null, 2);
// console.log(catalogJson);



// function getFiniteValue(obj) {
//     getProp(obj);
    	
//     function getProp(o) {
//         for(var prop in o) {
//             if(typeof(o[prop]) === 'object') {
//                 getProp(o[prop]);
//             } else {
//                 console.log(prop+' :'+o[prop])
//             }
//         }
//     }
// }
// getFiniteValue(productsCatalog);