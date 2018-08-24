Application.Classes.Favorites = class Favorites {

    constructor($el) {
        this.$addFavoritesBtn    = $el.find('.send-add-star');
        this.$deleteFavoritesBtn = $el.find('.send-remove-star');
        this.$removeFavoritesBtn = $el.find('.btn-danger');

        this._button_favorites();
        this._button_delete_favorites();
    }

    // создаем функцию добавления в избранное.
    _button_favorites() {
        this.$addFavoritesBtn.on('click', (event) => {
            let parentTr = $(event.currentTarget).closest('tr');
            let articleId = $(parentTr).data('articleId');
            $.ajax({
                method: 'POST',
                url: `/articles/${articleId}/add_to_favorites`,
                dataType: 'JSON',
            }).then((responce) => {
                $(`#add-star-to-${responce.id}`).addClass('hide');
                $(`#remove-star-from-${responce.id}`).removeClass('hide');

            })
        });
        //Создаем функцию онклик( с условие если добавлен в избранное то удолить его)
        this.$deleteFavoritesBtn.on('click', (event) => {
            let parentTr = $(event.currentTarget).closest('tr');
            let articleId = $(parentTr).data('articleId');
            $.ajax({
                method: 'PUT',
                url: `/articles/${articleId}/delete_to_favorites`,
                dataType: 'JSON',
            }).then((responce) => {
                $(`#add-star-to-${responce.id}`).removeClass('hide');
                $(`#remove-star-from-${responce.id}`).addClass('hide');
            })
        })
    }

    // создаем кнопку удоления из избранного.
    _button_delete_favorites() {
        this.$removeFavoritesBtn.on('click', (event) => {
            let parentTr = $(event.currentTarget).closest('tr');
            let articleId = parentTr.data('articleId');
            if (confirm('Are you sure?')) {
                $.ajax({
                    method: 'PUT',
                    url: `/articles/${articleId}/delete_to_favorites`,
                    dataType: 'JSON',
                }).then((responce) => {
                    parentTr.remove();
                })
            }
        });
    }
}
