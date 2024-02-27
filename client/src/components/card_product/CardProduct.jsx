import './cardproduct.css';

function CardProduct() {
	return (
		<div>
			<div className="card-product">
				<img
					className="card-product-img"
					src="https://www.recetasderechupete.com/wp-content/uploads/2019/07/shutterstock_1010248351.jpg"
					alt=""
				/>
				<div className="card-product-info">
					<div>
						<span className="product-name">Nombre Helado</span>
						<span className="type-product-name">Tipo Helado</span>
					</div>
					<div className="product-price">
						<span>$3500</span>
						<button className="btn-product-plus">
							<i className="bi bi-plus-circle-fill"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardProduct;
