<template>
  <div class="content">
				<div class="container-fluid">

					<div class="row">
						<div class="col-lg-8 offset-lg-2">
							<div class="invoice-content">
								<div class="invoice-item">
									<div class="row">
										<div class="col-md-6">
											<div class="invoice-logo">
												<p>{{id}}</p>
											</div>
										</div>
										<div class="col-md-6">
											<p class="invoice-details">
												<strong>Order:</strong>{{this.data.id}} <br>
												<strong>Issued:</strong> {{this.data.created_at}}
											</p>
										</div>
									</div>
								</div>
								
								<!-- Invoice Item -->
								<div class="invoice-item">
									<div class="row">
										<div class="col-md-6">
											<div class="invoice-info">
												<strong class="customer-text">Invoice From</strong>
												<p class="invoice-details invoice-details-two">
													{{data.user_id}}<br>
													Ruziba<br>
													bujumbura, burundi <br>
												</p>
											</div>
										</div>
										<div class="col-md-6">
											<div class="invoice-info invoice-info2">
												<strong class="customer-text">Invoice To</strong>
												<p class="invoice-details">
													{{data.client_id}} <br>
													299 Star Trek Drive, Panama City, <br>
													Florida, 32405, USA <br>
												</p>
											</div>
										</div>
									</div>
								</div>
								<!-- /Invoice Item -->
								
								<!-- Invoice Item -->
								<div class="invoice-item">
									<div class="row">
										<div class="col-md-12">
											<div class="invoice-info">
												<strong class="customer-text">Payment Method</strong>
												<p class="invoice-details invoice-details-two">
													Debit Card <br>
													{{data.num_bordereau}} <br>
													Ecobank Bank<br>
												</p>
											</div>
										</div>
									</div>
								</div>
								<!-- /Invoice Item -->
								
								<!-- Invoice Item -->
								<div class="invoice-item invoice-table-wrap">
									<div class="row">
										<div class="col-md-12">
											<div class="table-responsive">
												<table class="invoice-table table table-bordered">
													<thead>
														<tr>
															<th>Description</th>
															<th class="text-center">Quantity</th>
															<th class="text-right">Amount</th>
														</tr>
													</thead>
													<tbody>
													   <tr v-for="item in products[0]" :key="item.product_id">
															<td>{{item.product_id}}</td>
															<td class="text-center">{{item.product_quantity}}</td>
															<td class="text-right">{{item.amount}}Fbu</td>
														</tr>
														
													</tbody>
												</table>
											</div>
										</div>
										<div class="col-md-6 col-xl-4 ml-auto">
											<div class="table-responsive">
												<table class="invoice-table-two table">
													<tbody>
													
													
													<tr>
														<th>Total Amount:</th>
														<td><span>{{data.total_amount}} Fbu</span></td>
													</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
								<!-- /Invoice Item -->
								
								<!-- Invoice Information -->
								<!--<div class="other-info">
									<h4>Other information</h4>
									<p class="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dictum ligula, cursus blandit risus. Maecenas eget metus non tellus dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum. Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero.</p>
								</div>-->
								<!-- /Invoice Information -->
								
							</div>
						</div>
					</div>

				</div>

			</div>
</template>

<script>
import axios from 'axios'
export default {
    props:['id'],
    data()
    {
        return{
            data:{},
			products: [],  
        }
    },
    mounted(){
        
        this.getorder(this.id)
		console.log(this.products)

    },
    
    
    methods:{
        init() { 
        this.idt = this.id  // step1. assign propId to id
      },


         getorder(id)
        {
			let x=[];
            axios.get(this.$store.state.baseurl + "ventes/" + id,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
                    axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.data = resp.data
				let pr=JSON.parse(resp.data.products)
			pr.forEach(function(element){
				x.push(element)

					
				});
				console.log(x)
				this.products.push(x)
				
				
               // console.log(this.data)
              console.log(this.data)
            })
            .catch(err => {
                console.error(err)
            })

        }
       
            
        

    }

}
</script>

<style scoped>

.invoice-content {
    background-color: #fff;
	border: 1px solid #f0f0f0;
    border-radius: 4px;
    margin-bottom: 30px;
	padding: 30px;
}
.content {
	min-height: 200px;
	padding: 30px 0 0;
}

.invoice-item .invoice-text h2 {
	color:#272b41;
	font-size:36px;
	font-weight:600;
}
.invoice-item .invoice-details {
	text-align:right;
	color:#757575;
	font-weight:500
}
.invoice-item .invoice-details strong {
	color:#272b41
}
.invoice-item .invoice-details-two {
	text-align:left
}
.invoice-item .invoice-text {
	padding-top:42px;
	padding-bottom:36px
}
.invoice-item .invoice-text h2 {
	font-weight:400
}
.invoice-info {
	margin-bottom: 30px;
}
.invoice-info p {
	margin-bottom: 0;
}
.invoice-info.invoice-info2 {
    text-align: right;
}
.invoice-item .customer-text {
	font-size: 18px;
	color: #272b41;
	font-weight: 600;
	margin-bottom: 8px;
	display: block
}
.invoice-table tr th,
.invoice-table tr td,
.invoice-table-two tr th,
.invoice-table-two tr td {
	color: #272b41;
	font-weight: 600;
	padding: 10px 20px;
	line-height: inherit
}
.invoice-table tr td,
.invoice-table-two tr td {
	color: #757575;
	font-weight: 500;
}
.invoice-table-two {
	margin-bottom:0
}
.invoice-table-two tr th,
.invoice-table-two tr td {
	border-top: 0;
}
.invoice-table-two tr td {
	text-align: right
}
.invoice-info h5 {
    font-size: 16px;
    font-weight: 500;
}

</style>