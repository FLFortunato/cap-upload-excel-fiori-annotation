namespace my.bookshop;


entity Books {
  key ID      : Integer;
      title   : String;
      stock   : Integer;

      // composição (vida dependente)
      reviews : Composition of many Reviews
                  on reviews.book = $self;

      // associação (vida independente)
      orders  : Association to many Orders
                  on orders.book = $self;
}

entity Reviews {
  key ID       : Integer;
      rating   : Integer;
      comment  : String;

      book     : Association to Books;
      comments : Composition of many ReviewComments
                   on comments.review = $self;
}

entity ReviewComments {
  key ID     : Integer;
      text   : String;

      review : Composition of Reviews;
}

entity Orders {
  key ID       : Integer;
      quantity : Integer;
      status   : String;

      book     : Association to Books;
}
