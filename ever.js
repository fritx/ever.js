
;(function($){

  $.fn.ever = function $ever(data){
    return $(this).each(function(){
      ever(this, data)
    })
  }

  function ever(el, data){
    var $el = $(el)

    // keeps original template and reuses it
    if ($el.attr('r-unit') != null) {
      $el.attr('r-cloak', '')
      if ($el.data('_rStore')) {
        $el.html($el.data('_rStore'))
      } else {
        $el.data('_rStore', $el.html())
      }
    }

    // todo: nested scopes
    // todo: back tracking scopes access
    var scope = $el.closest('[r-with], [r-app]').attr('r-with')

    if ($el.attr('r-repeat')) {
      var path = $el.attr('r-repeat')
      var arr = val(path, scope, data)
      var $parent = $el.parent()
      $el.removeAttr('r-repeat')

      var frag = []
      $(arr).each(function(index){
        var $item = $el.clone()
        $item.attr('r-with', path + '['+ index +']')
        frag.push($item)
      })

      $el.replaceWith(frag)
      $(frag).each(function(index, item){
        ever(item, data)
      })
      return
    }

    if ($el.attr('r-text')) {
      var expr = $el.attr('r-text')
      $el.removeAttr('r-text')
      $el.text(val(expr, scope, data))
    }

    // recursively traverses
    $el.children().each(function(i, child){
      ever(child, data)
    })

    $el.removeAttr('r-with')
    $el.removeAttr('r-cloak')
  }

  function val(expr, scope, data){
    var body = 'with(arguments[0]'+ (scope ? '.' + scope : '') +'){return '+ expr +'}'
    return (new Function(body))(data)
  }

})(window.Zepto || window.jQuery)
