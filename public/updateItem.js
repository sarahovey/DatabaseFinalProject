var $  = require( 'jquery' );
function updateItem(id){
    $.ajax({
        url: '/items/' + id,
        type: 'PUT',
        data: $('#update-item').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

// {{!--<script defer>selectType({{item.item_type}});</script>--}}
// {{!--<script defer>selectBrand({{item.brand}});</script>--}}
// {{!--<script defer>selectSubstyle({{item.substyle}});</script>--}}
