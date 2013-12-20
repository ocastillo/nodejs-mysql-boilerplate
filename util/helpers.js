module.exports = {
  
  registerhelpers: function(hbs) {

    hbs.registerHelper('displayData', function(data) {
      var spacing = 5;
      var data = JSON.parse(data);

      var html = '<h2>' + data.length + ' items found.</h2>';

      function traverseData(child_data, html, spacing) {
        for(var i in child_data) {
          var css = (spacing == 5) ? 'class="parent-block"' : '';

          html += '<div style="padding-left:' + spacing + 'px;" ' + css + '>';
          html += '    <span class="key-name">' + i + '</span>';

          if(spacing == 5) {
            html += '<div>';
          }
          
          if(typeof child_data[i] == 'object') {
            html = traverseData(child_data[i], html, (spacing + 5));
          } else {
            html += ' ' + child_data[i] + '<br />';
          }

          if(spacing == 5) {
            html += '</div>';
          }

          html += '</div>';
        }

        return html;
      }


      return traverseData(data, html, spacing);
    });
  }

}
