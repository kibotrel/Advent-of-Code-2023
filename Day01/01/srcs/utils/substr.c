#include <stdlib.h>

char *substr(char const *s, unsigned int start, size_t len) {
  char *sub;
  unsigned int i = 0;

  if (!s || !(sub = (char *)malloc(sizeof(*sub) * (len + 1)))) {
    return (0);
  }

  while(len--) {
    sub[i++] = s[start++];
  }

  sub[i] = '\0';

  return (sub);
}
