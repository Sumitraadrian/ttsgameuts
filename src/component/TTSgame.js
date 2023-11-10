import React, { Component } from 'react';
import '../style/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class TTSGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreMessage: '', // Initialize score message as an empty string
    };
  }

  componentDidMount() {
    const buttons = document.querySelectorAll("button[name]");

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const namebtn = button.getAttribute('name');
        this.geserCek(namebtn);
      });
    });
  }

  componentWillUnmount() {
    const buttons = document.querySelectorAll("button[name]");

    buttons.forEach(button => {
      button.removeEventListener('click', () => {
        const namebtn = button.getAttribute('name');
        this.geserCek(namebtn);
      });
    });
  }

  geserCek(nbtn) {
    const table = document.querySelectorAll('.' + nbtn);
    if (table[0].disabled === true) {
      this.autoNext(0, nbtn);
    } else {
      table[0].select();
    }

    for (let i = 0; i < table.length; i++) {
      table[i].addEventListener('input', () => {
        if (i === table.length - 1) {
          var concatString = this.catString(nbtn);
          this.submitString(concatString, nbtn, table);
        } else if (i === table.length - 2 && table[table.length - 1].disabled === true) {
          var concatString = this.catString(nbtn);
          this.submitString(concatString, nbtn, table);
        } else {
          this.autoNext(i, nbtn);
          var concatString = this.catString(nbtn);
          this.submitString(concatString, nbtn, table);
        }
      });
    }
  }

  autoNext(i, cn) {
    const d = document.querySelectorAll('.' + cn);
    if (d[i + 1].disabled === true) {
      d[i + 2].select();
    } else {
      d[i + 1].select();
    }
  }

  catString(cn) {
    var concat = "";
    const d = document.querySelectorAll('.' + cn);
    for (let i = 0; i < d.length; i++) {
      concat += d[i].value;
    }
    return concat;
  }

  submitString(concat, tipe, tabel) {
    if (concat.toUpperCase() === "AKU" && tipe === "d1") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "KUA" && tipe === "m1") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "USANG" && tipe === "d2") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "ANTAM" && tipe === "d3") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "SIM" && tipe === "m2") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "AIR" && tipe === "m3") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "BERSERI" && tipe === "d4") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "RUMAH" && tipe === "m4") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "RISAU" && tipe === "m5") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "ATLAS" && tipe === "d5") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "APA" && tipe === "m6") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "HAWA" && tipe === "d6") {
      this.pengulanganTabel(tabel);
    } else if (concat.toUpperCase() === "BUUK" && tipe === "d7") {
      this.pengulanganTabel(tabel);
    }
  }

  pengulanganTabel(table) {
    for (let j = 0; j < table.length; j++) {
      table[j].disabled = true;
    }
  }

  calculateScore() {
    const answers = {
      d1: 'AKU',
      m1: 'KUA',
      d2: 'USANG',
      d3: 'ANTAM',
      m2: 'SIM',
      m3: 'AIR',
      d4: 'BERSERI',
      m4: 'RUMAH',
      m5: 'RISAU',
      d5: 'ATLAS',
      m6: 'APA',
      d6: 'HAWA',
      d7: 'BUUK',
    };

    for (const key in answers) {
      const answer = answers[key];
      const elements = document.querySelectorAll('.' + key);
      const userAnswer = Array.from(elements).map(element => element.value).join('');

      if (userAnswer.toUpperCase() !== answer) {
        // If any answer is incorrect, return an appropriate message
        return 'Maaf, nilai Anda belum sempurna.';
      }
    }

    // If all answers are correct, return a congratulatory message
    return 'Selamat, Anda benar semua! Nilai Anda 100.';
  }

  handleSubmit = () => {
    const scoreMessage = this.calculateScore();
    console.log('Score Message:', scoreMessage);
  
    // Check if the score message contains "100" to determine if all answers are correct
    if (scoreMessage.includes("100")) {
      // If all answers are correct, you can update the input fields to show they are correct
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        input.style.backgroundColor = 'lightgreen'; // Change the background color to green
        input.disabled = true; // Disable the input fields
      });
  
      // You can set the scoreMessage in your component's state or display it as needed
      this.setState({ scoreMessage });
    } else {
      // Handle the case when not all answers are correct
      this.setState({ scoreMessage });
    }
  };
  
  handleReset = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = ''; // Mengosongkan nilai input
      input.style.backgroundColor = ''; // Menghapus warna latar belakang
      input.disabled = false; // Mengaktifkan kembali input yang mungkin dinonaktifkan
    });
  
    // Menghapus pesan skor jika ada
    this.setState({ scoreMessage: '' });
  };
  

  render() {
    const scoreMessage = this.calculateScore();
    return (
      <div className="container">
        <h1 className="text-center mt-5 mb-5">Teka Teka Silang Game</h1>
        {this.state.scoreMessage && (
                      <div className="text-center mt-5">
                        <p>{this.state.scoreMessage}</p>
                      </div>
                    )}
        <div className="row">
          <div className="col align-self-center">
            <h4 className ="p">Mendatar</h4>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>1. Kata "I" dalam bahasa Indonesia</p>
              </div>
              <div className="pr-2">
                <button type="button" name="d1" className="btn btn-primary btn-sm align-self-center">
                  PILIH
                </button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>2. Sebutan untuk barang lama</p>
              </div>
              <div className="pr-2">
                <button type="button" name="d2" className="btn btn-primary btn-sm align-self-center">
                  PILIH
                </button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>3. Jenis merk emas murni</p>
              </div>
              <div className="pr-2"><button type="button" name="d3"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>4. Wajah yang terlihat bercahaya dan indah</p>
              </div>
              <div className="pr-2"><button type="button" name="d4"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>5. Buku panduan geografis yang berisi peta-peta negara dan kota</p>
              </div>
              <div className="pr-2"><button type="button" name="d5"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>6. Suasana atau kondisi atmosfer pada suatu tempat</p>
              </div>
              <div className="pr-2"><button type="button" name="d6"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>7. Kata "Rambut" dalam bahasa Sunda</p>
              </div>
              <div className="pr-2"><button type="button" name="d7"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
          </div>
          <div className="col align-self-center">
            <h4 className ="p">Menurun</h4>
            <div className="d-flex flex-column align-items-start">
              <div className="pr-2">
                <p>1. Kantor Urusan Agama</p>
              </div>
              <div className="pr-2"><button type="button" name="m1"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>2. Surat Izin Mengemudi</p>
              </div>
              <div className="pr-2"><button type="button" name="m2"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>3. Kata "Udara" dalam Bahasa Inggris</p>
              </div>
              <div className="pr-2"><button type="button" name="m3"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>4. House dalam bahasa Indonesia</p>
              </div>
              <div className="pr-2"><button type="button" name="m4"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>5. Suasana hati yang dipenuhi kegelisahan</p>
              </div>
              <div className="pr-2"><button type="button" name="m5"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
            <div className="d-flex flex-row align-items-baseline mb-3">
              <div className="pr-2">
                <p>6. Salah satu kata tanya</p>
              </div>
              <div className="pr-2"><button type="button" name="m6"
                className="btn btn-primary btn-sm align-self-center">PILIH</button>
              </div>
            </div>
          </div>
          <div className="col">
            <table className="tabel">
              <tbody>
              <tr>
                <td className="block"><input className="d1" type="text" maxLength="1" /></td>
                <td className="block"><input className="d1 m1" type="text" maxLength="1" /></td>
                <td className="block"><input className="d1" type="text" maxLength="1" /></td>
                <td className="block"></td>
                <td className="block"><input className="d2" type="text" maxLength="1" /></td>
                <td className="block"><input className="d2 m2" type="text" maxLength="1" /></td>
                <td className="block"><input className="d2" type="text" maxLength="1" /></td>
                <td className="block"><input className="d2" type="text" maxLength="1" /></td>
                <td className="block"><input className="d2" type="text" maxLength="1" /></td>
              </tr>
              <tr>
                <td className="block"></td>
                <td className="block"><input className="m1" type="text" maxLength="1" /></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"><input className="m2" type="text" maxLength="1" /></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"></td>
              </tr>
              <tr>
                <td className="block"></td>
                <td className="block"><input className="m1 d3" type="text" maxLength="1" /></td>
                <td className="block"><input className="d3" type="text" maxLength="1" /></td>
                <td className="block"><input className="d3" type="text" maxLength="1" /></td>
                <td className="block"><input className="d3 m3" type="text" maxLength="1" /></td>
                <td className="block"><input className="d3 m2" type="text" maxLength="1" /></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"></td>
              </tr>
              <tr>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"><input className="m3" type="text" maxLength="1" /></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"></td>
              </tr>
              <tr>
                <td className="block"><input className="m4" type="text" maxLength="1"/></td>
                <td className="block"></td>
                <td className="block"><input className="d4" type="text" maxLength="1"/></td>
                <td className="block"><input className="d4" type="text" maxLength="1"/></td>
                <td className="block"><input className="d4 m3" type="text" maxLength="1"/></td>
                <td className="block"><input className="d4" type="text" maxLength="1"/></td>
                <td className="block"><input className="d4" type="text" maxLength="1"/></td>
                <td className="block"><input className="d4 m5" type="text" maxLength="1"/></td>
                <td className="block"><input className="d4" type="text" maxLength="1"/></td>
              </tr>
              <tr>
                <td className="block"><input className="m4" type="text" maxLength="1"/></td>
                <td className="block"></td>
                <td className="block"></td>
                <td className="block"></td>
                        <td className="block"></td>
                        <td className="block"></td>
                        <td className="block"></td>
                        <td className="block"><input className="m5" type="text" maxLength="1"/></td>
                        <td className="block"></td>
                    </tr>
                    <tr>
                        <td className="block"><input className="m4" type="text" maxLength="1"/></td>
                        <td className="block"></td>
                        <td className="block"></td>
                        <td className="block"><input className="d5 m6" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d5" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d5" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d5" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d5 m5" type="text" maxLength="1"/></td>
                        <td className="block"></td>
                    </tr>

                    <tr>
                        <td className="block"><input className="m4" type="text" maxLength="1"/></td>
                        <td className="block"></td>
                        <td className="block"></td>
                        <td className="block"><input className="m6" type="text" maxLength="1"/></td>
                        <td className="block"></td>
                        <td className="block"></td>
                        <td className="block"></td>
                        <td className="block"><input className="m5" type="text" maxLength="1"/></td>
                        <td className="block"></td>

                    </tr>

                    <tr>
                        <td className="block"><input className="m4 d6" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d6" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d6" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d6 m6" type="text" maxLength="1"/></td>
                        <td className="block"></td>
                        <td className="block"><input className="d7" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d7" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d7 m5" type="text" maxLength="1"/></td>
                        <td className="block"><input className="d7" type="text" maxLength="1"/></td>

                    </tr>
              </tbody>
                    </table>
                    <div className="button-wrapper">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block submit-button"
                onClick={this.handleSubmit}
              >
                Submit Answers
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg btn-block"
                onClick={this.handleReset}
              >
                Reset
              </button>
            </div>
          </div>
          </div>
        </div>
    );
  }
}


export default TTSGame;
