function checkByte(object, maxByte) {
    // const maxByte = 40;
    const text = object.value;
    const textSize = text.length;
    
    let totalByte=0;
    for(let i = 0; i < textSize; i++){
    	const each_char = text.charAt(i);
        const uni_char = escape(each_char);
        if(uni_char.length>4){
            totalByte += 2;
        }else{
            totalByte += 1;
        }
    }

    const allowedByteDisplay = document.querySelector(".allowed-byte-display");

    if(totalByte > maxByte) {
        object.value = text.substring(0, textSize - 1);
        alert(`최대 ${maxByte}Bytes(한글 ${maxByte / 2}자, 영문 ${maxByte}자)까지 입력 가능합니다`);
    }

    allowedByteDisplay.textContent = totalByte;
}