import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInModel, SignUpModel } from 'app/models/auth';
import { passwordMatchingValidatior } from 'app/models/confirmed.validator';
import { ServicesService } from 'app/services.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  cities = [
    {
      name_ka: 'თბილისი',
      name_en: 'Tbilisi',
      location: '41.7151377,44.82709599999998',
    },
    {
      name_ka: 'აბაშა',
      name_en: 'Abasha',
      location: '42.2046024,42.2029857',
    },
    {
      name_ka: 'ამბროლაური',
      name_en: 'Ambrolauri',
      location: '42.5144988,43.14576910000005',
    },
    {
      name_ka: 'ახალქალაქი',
      name_en: 'Akhalkalaki',
      location: '41.4025151,43.487163099999975',
    },
    {
      name_ka: 'ახალციხე',
      name_en: 'Akhaltsikhe',
      location: '41.6434293,42.993444899999986',
    },
    {
      name_ka: 'ახმეტა',
      name_en: 'Akhmeta',
      location: '42.0385204,45.20684110000002',
    },
    {
      name_ka: 'ბათუმი',
      name_en: 'Batumi',
      location: '41.6167547,41.63674549999996',
    },
    {
      name_ka: 'ბაღდათი',
      name_en: 'Baghdati',
      location: '42.0732393,42.82122179999999',
    },
    {
      name_ka: 'ბოლნისი',
      name_en: 'Bolnisi',
      location: '41.4493594,44.548866299999986',
    },
    {
      name_ka: 'ბორჯომი',
      name_en: 'Borjomi',
      location: '41.8399528,43.39075690000004',
    },
    {
      name_ka: 'გარდაბანი',
      name_en: 'Gardabani',
      location: '41.4584982,45.09132019999993',
    },
    {
      name_ka: 'გორი',
      name_en: 'Gori',
      location: '41.9854144,44.10841099999993',
    },
    {
      name_ka: 'გურჯაანი',
      name_en: 'Gurjaani',
      location: '41.7438812,45.78938059999996',
    },
    {
      name_ka: 'დედოფლისწყარო',
      name_en: 'Dedoplistskaro',
      location: '41.4672254,46.117521500000066',
    },
    {
      name_ka: 'დმანისი',
      name_en: 'Dmanisi',
      location: '41.3298054,44.207312499999944',
    },
    {
      name_ka: 'დუშეთი',
      name_en: 'Dusheti',
      location: '42.0869842,44.69484509999995',
    },
    {
      name_ka: 'ვალე',
      name_en: 'Vale',
      location: '41.61379609999999,42.87623350000001',
    },
    {
      name_ka: 'ვანი',
      name_en: 'Vani',
      location: '42.0889602,42.50448430000006',
    },
    {
      name_ka: 'ზესტაფონი',
      name_en: 'Zestaponi',
      location: '42.1083332,43.03749330000005',
    },
    {
      name_ka: 'ზუგდიდი',
      name_en: 'Zugdidi',
      location: '42.5091391,41.86699199999998',
    },
    {
      name_ka: 'თეთრიწყარო',
      name_en: 'Tetritskaro',
      location: '41.54230829999999,44.47256360000006',
    },
    {
      name_ka: 'თელავი',
      name_en: 'Telavi',
      location: '41.918509,45.47769089999997',
    },
    {
      name_ka: 'თერჯოლა',
      name_en: 'Terjola',
      location: '42.1827769,42.96864500000004',
    },
    {
      name_ka: 'კასპი',
      name_en: 'Kaspi',
      location: '41.9260017,44.42450259999998',
    },
    {
      name_ka: 'ლაგოდეხი',
      name_en: 'Lagodekhi',
      location: '41.8186298,46.278130799999985',
    },
    {
      name_ka: 'ლანჩხუთი',
      name_en: 'Lanchkhuti',
      location: '42.0902225,42.03597119999995',
    },
    {
      name_ka: 'მარნეული',
      name_en: 'Marneuli',
      location: '41.4689396,44.785078',
    },
    {
      name_ka: 'მარტვილი',
      name_en: 'Martvili',
      location: '42.4231839,42.381114600000046',
    },
    {
      name_ka: 'მცხეთა',
      name_en: 'Mtskheta',
      location: '41.8411674,44.70738640000002',
    },
    {
      name_ka: 'ნინოწმინდა',
      name_en: 'Ninotsminda',
      location: '41.2713699,43.587938500000064',
    },
    {
      name_ka: 'ოზურგეთი',
      name_en: 'Ozurgeti',
      location: '41.9208048,41.99313280000001',
    },
    {
      name_ka: 'ონი',
      name_en: 'Oni',
      location: '42.5779358,43.43508880000002',
    },
    {
      name_ka: 'რუსთავი',
      name_en: 'Rustavi',
      location: '41.5225612,45.04303690000006',
    },
    {
      name_ka: 'საგარეჯო',
      name_en: 'Sagarejo',
      location: '41.725392,45.33507910000003',
    },
    {
      name_ka: 'სამტრედია',
      name_en: 'Samtredia',
      location: '42.1599257,42.33676779999996',
    },
    {
      name_ka: 'საჩხერე',
      name_en: 'Sachkhere',
      location: '42.3420079,43.41060449999998',
    },
    {
      name_ka: 'სენაკი',
      name_en: 'Senaki',
      location: '42.2701283,42.04567080000004',
    },
    {
      name_ka: 'სიღნაღი',
      name_en: 'Sighnaghi',
      location: '41.6111031,45.92714360000002',
    },
    {
      name_ka: 'ტყიბული',
      name_en: 'Tkibuli',
      location: '42.34141229999999,42.994163999999955',
    },
    {
      name_ka: 'ფოთი',
      name_en: 'Poti',
      location: '42.1582596,41.671370000000024',
    },
    {
      name_ka: 'ქარელი',
      name_en: 'Kareli',
      location: '22.9285907,79.06168079999998',
    },
    {
      name_ka: 'ქობულეთი',
      name_en: 'Kobuleti',
      location: '41.815997,41.78381009999998',
    },
    {
      name_ka: 'ქუთაისი',
      name_en: 'Kutaisi',
      location: '42.2488567,42.69421460000001',
    },
    {
      name_ka: 'ყვარელი',
      name_en: 'Kvareli',
      location: '41.9483514,45.814791900000046',
    },
    {
      name_ka: 'ცაგერი',
      name_en: 'Tsageri',
      location: '42.6482211,42.76488599999993',
    },
    {
      name_ka: 'წალენჯიხა',
      name_en: 'Tsalenjikha',
      location: '42.6215005,42.066009699999995',
    },
    {
      name_ka: 'წალკა',
      name_en: 'Tsalka',
      location: '41.5979563,44.094688099999985',
    },
    {
      name_ka: 'წნორი',
      name_en: 'Tsnori',
      location: '41.6159762,45.97037249999994',
    },
    {
      name_ka: 'წყალტუბო',
      name_en: 'Tskaltubo',
      location: '42.3284986,42.60036820000005',
    },
    {
      name_ka: 'ჭიათურა',
      name_en: 'Chiatura',
      location: '42.29039059999999,43.28110779999997',
    },
    {
      name_ka: 'ხაშური',
      name_en: 'Khashuri',
      location: '41.9837685,43.58659469999998',
    },
    {
      name_ka: 'ხობი',
      name_en: 'Khobi',
      location: '42.3195285,41.89999339999997',
    },
    {
      name_ka: 'ხონი',
      name_en: 'Khoni',
      location: '42.31488239999999,42.41494869999997',
    },
    {
      name_ka: 'ჯვარი',
      name_en: 'Jvari',
      location: '42.7090813,42.049093099999936',
    },
  ];

  constructor(private userService: ServicesService, private router: Router) {}

  form: FormGroup;
  errorMsg = '';
  success = false;
  isLoading = false;
  errorResponse = false;

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        email: new FormControl('', Validators.required),
        firstNameAndLastNameEN: new FormControl('', Validators.required),
        firstNameAndLastNameKA: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        additionalPhoneNumber: new FormControl(''),
        personalID: new FormControl('', Validators.required),
        region: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: passwordMatchingValidatior }
    );
  }

  // get f(){
  //   return this.form.controls;
  // }

  signUp() {
    const form = this.form.value;
    if (this.form.valid) {
      let model = new SignUpModel();

      model.email = form.email;
      model.firstNameAndLastNameEN = form.firstNameAndLastNameEN;
      model.firstNameAndLastNameKA = form.firstNameAndLastNameKA;
      model.phoneNumber = form.phoneNumber.toString();
      model.additionalPhoneNumber = form.additionalPhoneNumber.toString();
      model.personalID = form.personalID.toString();
      model.region = form.region;
      model.address = form.address;
      model.password = form.password;

      this.isLoading = true;

      this.userService.createUser(model).subscribe(
        (value) => {
          console.log(value);
          console.log(model);

          this.isLoading = false;
          let model2 = new SignInModel();
          model2.email = this.form.value.email;
          model2.password = this.form.value.password;
          this.isLoading = true;

          this.userService.loginUser(model2).subscribe((res) => {
            this.isLoading = false;
            localStorage.setItem('id', res.id);
            localStorage.setItem('token', res.token);
            localStorage.setItem('name', res.name);

            if (res.isAdmin) {
              localStorage.setItem('userType', 'admin');
              this.router.navigate(['/admin']);
            } else {
              localStorage.setItem('userType', 'user');
              this.router.navigate(['/dashboard']);
            }
          });
        },
        (errorRes) => {
          this.isLoading = false;
          this.errorResponse = true;
          // if (errorRes.error[0].code === 'DuplicateUserName') {
          //   this.errorMsg = errorRes.error[0].description;
          // }
          console.log(errorRes);
        }
      );
    } else {
      this.errorMsg = 'There is an error. Fill in the forms correctly!';
      return;
    }
  }
}
