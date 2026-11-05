import type { CodeExample } from '../types';

export const codeExamples: CodeExample[] = [
  {
    id: 'string-immutability',
    title: 'String Immutability — The Forgotten Result',
    description: 'Calling concat() on a String returns a new String. If you do not assign it, the original variable is unchanged.',
    code: `String name = "Java";
name.concat(" Programming");
System.out.println(name);`,
    output: 'Java',
    explanation: 'concat() creates a new String object "Java Programming" in memory, but that new object is immediately discarded because we did not assign the return value. The variable name still refers to the original String "Java". This demonstrates immutability: the original object is never altered.',
    category: 'string',
  },
  {
    id: 'string-reassignment',
    title: 'String Reassignment — Capturing the New Object',
    description: 'By assigning the return value of concat() back to the variable, the variable now refers to the newly created String.',
    code: `String name = "Java";
name = name.concat(" Programming");
System.out.println(name);`,
    output: 'Java Programming',
    explanation: 'Here we assign the new String returned by concat() back to name. The variable name now refers to the new String "Java Programming". The original String "Java" still exists in memory and is eventually garbage-collected. The String object itself was never modified — reassignment changes what the variable points to.',
    category: 'string',
  },
  {
    id: 'stringbuilder-append',
    title: 'StringBuilder append() — Mutable in Action',
    description: 'StringBuilder modifies its own internal character sequence. append() changes the same object.',
    code: `StringBuilder sb = new StringBuilder("Java");
sb.append(" Programming");
System.out.println(sb.toString());`,
    output: 'Java Programming',
    explanation: 'Unlike String, StringBuilder modifies its own internal buffer. The append() method does not return a new object — it updates the character sequence inside the same StringBuilder instance. No new object is created for the modification. This makes it efficient for many sequential modifications.',
    category: 'stringbuilder',
  },
  {
    id: 'stringbuilder-reverse',
    title: 'StringBuilder reverse() — In-Place Reversal',
    description: 'reverse() reverses the character sequence directly within the existing StringBuilder object.',
    code: `StringBuilder sb = new StringBuilder("STRINGVERSE");
sb.reverse();
System.out.println(sb.toString());`,
    output: 'ESREVERT GNIRTS',
    explanation: 'The reverse() method rearranges the characters of the StringBuilder in place. Because StringBuilder is mutable, no new object is needed. This kind of in-place operation is one of the key advantages of StringBuilder over String when you need to transform text frequently.',
    category: 'stringbuilder',
  },
  {
    id: 'stringbuffer-append',
    title: 'StringBuffer append() — Synchronized Modification',
    description: 'StringBuffer has the same mutable behaviour as StringBuilder, but its methods are synchronized.',
    code: `StringBuffer buf = new StringBuffer("Safe");
buf.append(" Text");
System.out.println(buf.toString());`,
    output: 'Safe Text',
    explanation: 'StringBuffer works like StringBuilder but each individual method call is synchronized, meaning only one thread can execute a given method on the same StringBuffer instance at a time. This protects individual operations in multi-threaded scenarios. Note that compound operations (multiple method calls) still require external synchronization for complete thread safety.',
    category: 'stringbuffer',
  },
  {
    id: 'string-equals-vs-reference',
    title: 'equals() vs == — Value vs Reference',
    description: 'equals() compares the content of two String objects. == compares whether two references point to the same object.',
    code: `String a = new String("hello");
String b = new String("hello");
System.out.println(a == b);       // false
System.out.println(a.equals(b));  // true`,
    output: 'false\ntrue',
    explanation: 'Using new String() creates two separate String objects in memory, so a and b are distinct references even though they contain the same content. The == operator checks if both variables point to the exact same object in memory — they do not, so it returns false. The equals() method checks whether the contents are identical — they are, so it returns true. Always use equals() to compare String contents in Java.',
    category: 'comparison',
  },
];
