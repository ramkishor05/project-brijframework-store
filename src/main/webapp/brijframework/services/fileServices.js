webApp.service('fileServices', function($http,$q,$window){
    function fileReader(file){
    
    }
	function linkDownload(a, filename, content,contentType) {
        contentType = contentType==undefined? 'data:application/octet-stream,':contentType;
        uriContent = contentType + encodeURIComponent(content);
        a.setAttribute('href', uriContent);
        a.setAttribute('download', filename);
      }
   
    function download(filename, content,contentType) {
        var a = document.createElement('a');
        linkDownload(a, filename, content,contentType);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
     }
     //
     function zipDownload(zipFileName,fileArray) {
		var zip = new JSZip();
		for(file in fileArray){
			zip.file(fileArray[file].file, fileArray[file].content);
		}
		zip.generateAsync({type:"base64"}).then(function (content) {
			contentType="data:application/zip;base64,";
			download(zipFileName,content,contentType);
		});
	 }
	
	return {
		linkDownload						:			linkDownload,
		dataDownload						:			dataDownload,
		zipDownload					        :			zipDownload
	}
});