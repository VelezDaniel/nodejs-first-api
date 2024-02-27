import CardProduct from "../card_product/CardProduct";
import "./mainproducts.css";

function MainProducts() {
	return (
		<main>
			<div className="selling-section h-content">
				<div className="title-sect">
					<h2 className="title">¡Nuestros productos más populares!</h2>
					<div className="container-search">
						<form action="">
							<input
								type="text"
								name=""
								id=""
								placeholder="¡Busca tu favorito!"
							/>
							<button type="submit" className="btn-search">
								<i className="bi bi-search"></i>
							</button>
						</form>
					</div>
				</div>
				<div className="products-section">
					<CardProduct />
				</div>
			</div>
		</main>
	);
}

export default MainProducts;
