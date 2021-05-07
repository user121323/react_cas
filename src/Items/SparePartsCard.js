function SparePartsCard(props) {
    const noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
    const link = "/carSparePart/"+props.carspare.id
    const date_region = props.carspare.carRegion.name+" "+ props.carspare.added_date

    return <div className="container">
        <div className="row">
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <a href={link}>
                            <img src="https://alakcell-photos-kl.kcdn.kz/webp/13/13a0c436-6da8-4a07-8238-16e1a49b4310/1-750x470.webp" alt="..." style={{width: '100%'}}/>
                        </a>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"><a
                                href={link}>BMW
                                320 2008 year</a> <span style={{float: 'right'}}>3 900 000 tg</span></h5>
                            <p className="card-text">2011 г., Б/у седан, 1.8 л, бензин, КПП автомат, с пробегом 114 000
                                км, черный, тонировка, литые диски, дневные ходовые...</p>
                            <p className="card-text"><small className="text-muted">{date_region}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SparePartsCard;