const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {

        let x = Math.round(accelerometerData.x * 100) / 100
        let y = Math.round(accelerometerData.y * 100) / 100
        let z = Math.round(accelerometerData.z * 100) / 100
        
        setInclinacao1(Math.atan(Math.round(
          (x
          /
          (Math.sqrt(
              Math.pow(y,2)
              + Math.pow(z, 2)
            ))) * 100
          )/100))
        setInclinacao2(Math.atan(
          Math.round(
            (y/
            (Math.sqrt(Math.pow(x,2) + Math.pow(z, 2)))) * 100
          )/100
        ))
        setInclinacao3(
          Math.atan(Math.round((Math.sqrt(Math.pow(x,2) + Math.pow(y,2))/z) * 100) / 100)
        )
        })
    );
  };