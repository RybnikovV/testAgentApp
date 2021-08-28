import { TransportTariff } from "./model/tariff";
import { FinalPrice } from "./model/finalPrice" 


export function calcTariff(valueForm:any) {
  const calculatedData: any = {
    planeTariff: [],
    traingTariff: [],
  };
  const tariffPlane: TransportTariff[] = [{
      name: 'Эконом',
      coastKilometer: 4,
      maxBaggageWeight: 20,
      maxFreeBaggageWeight: 5,
      coastBaggage: 4000,
      maxChildrenAge: 0,
      childrenDiscount: 0
    }, {
      name: 'Продвинутый',
      coastKilometer: 8,
      maxBaggageWeight: 50,
      maxFreeBaggageWeight: 20,
      coastBaggage: 5000,
      maxChildrenAge: 7,
      childrenDiscount: 30
    }, {
      name: 'Люкс',
      coastKilometer: 15,
      maxBaggageWeight: 50,
      maxFreeBaggageWeight: 50,
      coastBaggage: 0,
      maxChildrenAge: 16,
      childrenDiscount: 30
    }];
  const tariffTrain: TransportTariff[] = [{
    name: 'Эконом',
    coastKilometer: 0.5,
    maxBaggageWeight: 50,
    maxFreeBaggageWeight: 15,
    get coastBaggage() {
      return (valueForm.baggageWeight - this.maxFreeBaggageWeight) * 50;
    },
    maxChildrenAge: 5,
    childrenDiscount: 50
  }, {
    name: 'Продвинутый',
    coastKilometer: 2,
    maxBaggageWeight: 60,
    maxFreeBaggageWeight: 20,
    get coastBaggage() {
      return (valueForm.baggageWeight - this.maxFreeBaggageWeight) * 50;
    },
    maxChildrenAge: 8,
    childrenDiscount: 30
  }, {
    name: 'Люкс',
    coastKilometer: 4,
    maxBaggageWeight: 60,
    maxFreeBaggageWeight: 60,
    coastBaggage: 0,
    maxChildrenAge: 16,
    childrenDiscount: 20
  }];

  function getPrice(tariff: TransportTariff[]): FinalPrice[]{
    const coastList: FinalPrice[] = [];
    tariff.forEach((item: TransportTariff) => {
      if(item.maxBaggageWeight < valueForm.baggageWeight) return;

      let res: any = {};
      res.name = item.name
      res.coast = valueForm.killometers * item.coastKilometer;
      if (item.maxChildrenAge > valueForm.age) {
        res.coast = res.coast/100 * 100-item.childrenDiscount;
      }
      if (item.maxFreeBaggageWeight < valueForm.baggageWeight) {
        res.coast = res.coast + item.coastBaggage;
      }
      coastList.push(res);
    })
    return coastList;
  }

  calculatedData.planeTariff = getPrice(tariffPlane);
  calculatedData.traingTariff = getPrice(tariffTrain);

  return calculatedData;
}