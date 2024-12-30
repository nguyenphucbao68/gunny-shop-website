var gnAvatarHandle = {
	load(){
		this.getPathEquip().resetCanvas(); // lấy đường dẫn trang bị -> reset canvas

		/** 
		 * Filter ra những equip cần draw
		 * Chỉ filter những Equip bắt buộc có như (tóc, áo, mặt). Còn Mặt xử lý riêng
		 * Hay các trang bị khác default (0)
		 */
		const ImageOriginal = Object.keys(this.res).filter(key => 
		 	["cloth", "hair"].includes(key) || gnAvatarInfo.suit[key]
		 	);

       	/**
       	 * Load hết các promise của các equip cần draw (chuyển sang trạng thái Fulfilled) - resolve
       	 * @param  {Array}   original  [danh sách các equip cần draw]
       	 * @return {Promise}           [các promise của từng equip]
       	 */
       	const ImageOriginalFulfilled = (original) => Promise.all(
       	 	original.map(key => 
       	 		getImage(this.res[key].original, {
       	 			key
       	 		})
       	 		)
       	 	);

       	 /** Xử lý các promise của Equip */
       	ImageOriginalFulfilled(ImageOriginal)
       	 	.then(value => {
       			// ta tiến hành draw Equip
       			let key = item.key;
       			this.imageloaded.equip[key] = item;
       			gnAvatarDraw.drawStaticObject({ key, original: item });
       		})
			.catch(rejectFnc); // bắt lỗi
		return this;
	}
}