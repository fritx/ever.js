
;(function($){

  $.fn.m = function $m(data){
    return $(this).each(function(){
      m(this, data)
    })
  }

  function m(el, data){
    var $el = $(el)

    // keeps original template and reuses it
    if ($el.attr('m-unit') != null) {
      $el.attr('m-cloak', '')
      if ($el.data('_mStore')) {
        $el.html($el.data('_mStore'))
      } else {
        $el.data('_mStore', $el.html())
      }
    }

    // todo: nested scopes
    // todo: back tracking scopes access
    var scope = $el.closest('[m-with], [m-app]').attr('m-with')

    if ($el.attr('m-repeat')) {
      var path = $el.attr('m-repeat')
      var arr = val(path, scope, data)
      var $parent = $el.parent()
      $el.removeAttr('m-repeat')

      var frag = []
      $(arr).each(function(index){
        var $item = $el.clone()
        $item.attr('m-with', path + '['+ index +']')
        frag.push($item)
      })

      $el.replaceWith(frag)
      $(frag).each(function(index, item){
        m(item, data)
      })
      return
    }

    if ($el.attr('m-text')) {
      var expr = $el.attr('m-text')
      $el.removeAttr('m-text')
      $el.text(val(expr, scope, data))
    }

    // recursively traverses
    $el.children().each(function(i, child){
      m(child, data)
    })

    $el.removeAttr('m-with')
    $el.removeAttr('m-cloak')
  }

  function val(expr, scope, data){
    var body = 'with(arguments[0]'+ (scope ? '.' + scope : '') +'){return '+ expr +'}'
    return (new Function(body))(data)
  }

})(window.Zepto || window.jQuery)
