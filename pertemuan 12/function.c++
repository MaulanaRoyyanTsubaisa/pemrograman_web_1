#include <iostream>
using namespace std;

double hitungNilai(double tugas,
                   double uts,
                   double uas) {

    return (tugas * 0.3) +
           (uts * 0.3) +
           (uas * 0.4);
}

int main() {

    double hasil =
        hitungNilai(90, 80, 85);

    cout << "Nilai Akhir = "
         << hasil;

    return 0;
}