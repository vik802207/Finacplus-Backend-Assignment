#include <bits/stdc++.h>
using namespace std;

char caesarRotateChar(char ch, int rot) {
    if (ch >= 'A' && ch <= 'Z')
        return char(( (ch - 'A' + rot) % 26 ) + 'A');
    else if (ch >= 'a' && ch <= 'z')
        return char(( (ch - 'a' + rot) % 26 ) + 'a');
    return ch;
}

string caesarRotateString(const string &s, int rot) {
    string out = "";
    for (char ch : s) out += caesarRotateChar(ch, rot);
    return out;
}

string rleEncode(const string &s) {
    if (s.empty()) return "";
    string out = "";
    char cur = s[0];
    int cnt = 1;

    for (int i = 1; i < s.size(); i++) {
        if (s[i] == cur) cnt++;
        else {
            out += cur;
            if (cnt > 1) out += to_string(cnt);
            cur = s[i];
            cnt = 1;
        }
    }
    // append last group
    out += cur;
    if (cnt > 1) out += to_string(cnt);

    return out;
}

string specialCipher(const string &input, int rot) {
    string rotated = caesarRotateString(input, rot);
    return rleEncode(rotated);
}

int main() {
    cout << specialCipher("AABCCC", 3) << endl; 
    return 0;
}
