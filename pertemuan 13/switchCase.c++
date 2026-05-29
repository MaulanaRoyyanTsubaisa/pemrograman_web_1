#include <iostream>
using namespace std;

int main() {
    int pilihan;

    cout << "=== MENU MAKANAN ===" << endl;
    cout << "1. Nasi Goreng" << endl;
    cout << "2. Mie Ayam" << endl;
    cout << "3. Bakso" << endl;
    cout << "4. Soto Ayam" << endl;

    cout << "Pilih menu: ";
    cin >> pilihan;

    switch(pilihan) {
        case 1:
            cout << "Harga Nasi Goreng Rp15.000";
            break;
        case 2:
            cout << "Harga Mie Ayam Rp12.000";
            break;
        case 3:
            cout << "Harga Bakso Rp13.000";
            break;
        case 4:
            cout << "Harga Soto Ayam Rp14.000";
            break;
        default:
            cout << "Menu tidak tersedia";
    }

    return 0;
}