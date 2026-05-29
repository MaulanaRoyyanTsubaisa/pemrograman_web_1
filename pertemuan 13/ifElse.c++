#include <iostream>
using namespace std;

int main() {
    int nilai, kehadiran;

    cout << "Masukkan nilai: ";
    cin >> nilai;

    cout << "Masukkan kehadiran (%): ";
    cin >> kehadiran;

    if (nilai >= 75 && kehadiran >= 75) {
        cout << "Status: LULUS";
    }
    else if (nilai >= 75 && kehadiran < 75) {
        cout << "Status: TIDAK LULUS (Kehadiran kurang)";
    }
    else {
        cout << "Status: TIDAK LULUS";
    }

    return 0;
}